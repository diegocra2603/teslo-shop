import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean;

    openSideMenu: () => void;
    clodeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    clodeSideMenu: () => set({ isSideMenuOpen: false }),
}))