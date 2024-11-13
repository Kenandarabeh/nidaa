import { create } from 'zustand';

const useMenuStore = create((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;
