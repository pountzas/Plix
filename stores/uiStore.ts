import { create } from 'zustand'

interface UiState {
  modalOpen: boolean
  menuSize: boolean
  apiKeyErrorModal: boolean
  rateLimitErrorModal: boolean
}

interface UiActions {
  setModalOpen: (open: boolean) => void
  setMenuSize: (size: boolean) => void
  setApiKeyErrorModal: (open: boolean) => void
  setRateLimitErrorModal: (open: boolean) => void
  toggleModal: () => void
  toggleMenuSize: () => void
}

type UiStore = UiState & UiActions

export const useUiStore = create<UiStore>((set) => ({
  // Initial state (matching Recoil defaults)
  modalOpen: false,
  menuSize: false,
  apiKeyErrorModal: false,
  rateLimitErrorModal: false,

  // Actions
  setModalOpen: (open: boolean) => set({ modalOpen: open }),
  setMenuSize: (size: boolean) => set({ menuSize: size }),
  setApiKeyErrorModal: (open: boolean) => set({ apiKeyErrorModal: open }),
  setRateLimitErrorModal: (open: boolean) => set({ rateLimitErrorModal: open }),
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
  toggleMenuSize: () => set((state) => ({ menuSize: !state.menuSize })),
}))
