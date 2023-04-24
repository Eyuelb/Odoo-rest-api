import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePageLayoutStore = create(
  
    persist(
      (set, get) => ({
        pageLayout: {
          openSidenav: true,
          openMiniSidenav: window.innerWidth <= 1280,
          headnavStick: false,
          darkMode:false,
        },
        updatePageLayout: (targetValue, newState) => {
          set((state) => ({
            pageLayout: {
              ...state.pageLayout,
              [targetValue]: newState,
            },
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

export const useOpenSidenav = () => usePageLayoutStore((state) => state.pageLayout.openSidenav)
export const useOpenMiniSidenav = () => usePageLayoutStore((state) => state.pageLayout.openMiniSidenav)
export const useHeadnavStick = () => usePageLayoutStore((state) => state.pageLayout.headnavStick)
export const useDarkMode = () => usePageLayoutStore((state) => state.pageLayout.darkMode)
export const useUpdatePageLayout = () => usePageLayoutStore((state) => state.updatePageLayout)



window.addEventListener('resize', () => {
  usePageLayoutStore.setState((state) => ({
    pageLayout: {
      ...state.pageLayout,
      openMiniSidenav: window.innerWidth <= 1280
    },
  }));
})
window.removeEventListener('resize', () => {})

window.addEventListener('scroll', () => {
  usePageLayoutStore.setState((state) => ({
    pageLayout: {
      ...state.pageLayout,
      headnavStick: window.pageYOffset >= 70,
    },
  }));
}),
window.removeEventListener('scroll', () => {})
