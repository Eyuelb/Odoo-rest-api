import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePageLayoutStore = create(
  
    persist(
      (set, get) => ({
        openSidenav: true,
        openMiniSidenav: window.innerWidth <= 1280,
        headnavStick: window.pageYOffset >= 70,
        darkMode:false,
        updatePageLayout: (targetValue, newState) => {
          set(() => ({
            [targetValue]: newState,
          }));
        },
      }),
      {
        name: 'page-layout-storage',
        storage: {
          getItem: (key) => JSON.parse(localStorage.getItem(key)),
          setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        },  
        
      },
    ),
);

export const useOpenSidenav = () => usePageLayoutStore((state) => state.openSidenav)
export const useOpenMiniSidenav = () => usePageLayoutStore((state) => state.openMiniSidenav)
export const useHeadnavStick = () => usePageLayoutStore((state) => state.headnavStick)
export const useDarkMode = () => usePageLayoutStore((state) => state.darkMode)
export const useUpdatePageLayout = () => usePageLayoutStore((state) => state.updatePageLayout)



window.addEventListener('resize', () => {
  usePageLayoutStore.setState(() => ({
    openMiniSidenav: window.innerWidth <= 1280
  }));
})
window.removeEventListener('resize', () => {})

window.addEventListener('scroll', () => {
  usePageLayoutStore.setState(() => ({
    headnavStick: window.pageYOffset >= 70,
  }));
}),
window.removeEventListener('scroll', () => {})

window.addEventListener('load', () => {
  usePageLayoutStore.setState(() => ({
    headnavStick: window.pageYOffset >= 70,
    openMiniSidenav: window.innerWidth <= 1280
  }));
}),
window.removeEventListener('load', () => {})