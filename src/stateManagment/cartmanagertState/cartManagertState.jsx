import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartManagertState = create(
  
    persist(
      (set, get) => ({
        cart: [],
        paymentMode: '',
        addToCart: (productId) => {

        },
      }),
      {
        name: 'cart-storage',
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


