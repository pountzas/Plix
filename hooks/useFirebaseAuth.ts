import { useEffect, useState } from 'react'
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react'
import { auth } from '../firebase'
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth'

/**
 * Hook to bridge NextAuth and Firebase Auth
 * This ensures Firestore operations have proper Firebase authentication
 */
export function useFirebaseAuth() {
  const { data: session, status } = useSession()
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [isFirebaseReady, setIsFirebaseReady] = useState(false)

  // Listen to Firebase Auth state changes
  useEffect(() => {
    console.log('useFirebaseAuth - Setting up Firebase auth listener')

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('useFirebaseAuth - Firebase auth state changed:', {
        user: user ? { uid: user.uid, email: user.email } : null,
        isAuthenticated: !!user
      })

      setFirebaseUser(user)
      setIsFirebaseReady(true)
    })

    return () => {
      console.log('useFirebaseAuth - Cleaning up Firebase auth listener')
      unsubscribe()
    }
  }, [])

  // Sync NextAuth session with Firebase Auth
  useEffect(() => {
    if (!isFirebaseReady) return

    const syncAuth = async () => {
      // If NextAuth has a session but Firebase doesn't
      if (session?.user && !firebaseUser) {
        console.log('useFirebaseAuth - NextAuth authenticated, Firebase not authenticated')

        try {
          // Try to sign in to Firebase using NextAuth session
          // This is a simplified approach - in production you'd want more robust token handling
          const credential = GoogleAuthProvider.credential(session.accessToken)
          await signInWithCredential(auth, credential)
          console.log('useFirebaseAuth - Successfully signed into Firebase')
        } catch (error) {
          console.error('useFirebaseAuth - Failed to sync with Firebase:', error)
          // If Firebase auth fails, we'll work with what we have
        }
      }

      // If NextAuth is not authenticated but Firebase is
      else if (!session?.user && firebaseUser) {
        console.log('useFirebaseAuth - NextAuth not authenticated, Firebase is')
        // Sign out of Firebase to match NextAuth state
        await firebaseSignOut(auth)
      }
    }

    syncAuth()
  }, [session, firebaseUser, isFirebaseReady])

  const signIn = async () => {
    await nextAuthSignIn('google')
  }

  const signOut = async () => {
    await nextAuthSignOut()
    await firebaseSignOut(auth)
  }

  return {
    // Authentication state
    isAuthenticated: !!firebaseUser,
    firebaseUser,
    nextAuthSession: session,
    isLoading: status === 'loading' || !isFirebaseReady,

    // Auth methods
    signIn,
    signOut,

    // User info
    userId: firebaseUser?.uid || null,
    userEmail: firebaseUser?.email || null
  }
}
