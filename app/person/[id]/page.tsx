import { notFound } from 'next/navigation';
import PersonProfile from '../../../components/PersonProfile';

interface PersonPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server component that handles the dynamic route for person profiles
export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;

  // Validate that the ID is a valid TMDB person ID (should be a number)
  const personId = parseInt(id, 10);
  if (isNaN(personId) || personId <= 0) {
    notFound();
  }

  return <PersonProfile personId={personId} />;
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { id } = await params;

  try {
    const personId = parseInt(id, 10);
    // We'll fetch the person data in the component, but for now return a basic title
    return {
      title: `Person Profile - Plix`,
      description: `View profile and filmography for person ID ${personId}`,
    };
  } catch (error) {
    return {
      title: 'Person Profile - Plix',
      description: 'View actor and crew member profiles',
    };
  }
}
