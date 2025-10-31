import { create } from 'zustand'

interface UiState {
  modalOpen: boolean
  menuSize: boolean
}

interface UiActions {
  setModalOpen: (open: boolean) => void
  setMenuSize: (size: boolean) => void
  toggleModal: () => void
  toggleMenuSize: () => void
}

type UiStore = UiState & UiActions

export const useUiStore = create<UiStore>((set) => ({
  // Initial state (matching Recoil defaults)
  modalOpen: false,
  menuSize: false,

  // Actions
  setModalOpen: (open: boolean) => set({ modalOpen: open }),
  setMenuSize: (size: boolean) => set({ menuSize: size }),
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
  toggleMenuSize: () => set((state) => ({ menuSize: !state.menuSize })),
}))
