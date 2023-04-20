import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

export const usePageLayoutStore = create(
  
    persist(
      (set, get) => ({
        pageLayout: {
          openSidenav: true,
          openMiniSidenav: window.innerWidth <= 1280,
          openConfigurator: false,
          openLanguageConfigurator: false,
          headnavStick: false,
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



// //   return {
// //     pageLayout: {
// //       openSidenav: true,
// //       openMiniSidenav: false,
// //       openConfigurator:false,
// //       openLanguageConfigurator:false,
// //       headnavStick:false,
// //     },
// //     updatePageLayout: (targetValue, newState) => {
// //       set((state) => ({
// //         pageLayout: {
// //           ...state.pageLayout,
// //           [targetValue]: newState,
// //         },
// //       }));
// //     },
// //     checkPageLayout: () => {
// //      handleWindowResize();
// //      handleWindowScroll();
// //     },
// //   };
// // }, {
// //   name: 'page-layout-storage', // A unique name for the storage, so multiple stores don't conflict
// //   torage: {
// //     getItem: (key) => JSON.parse(localStorage.getItem(key)),
// //     setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
// //   }, // Convert string back to object when retrieving from local storage
// // }));




// export const usePageLayoutStore = create(persist((set,get) => {


//   const handleWindowResize = () => {
//     const { innerWidth} = window;
//     if (innerWidth <= 1280) {
//       set((state) => ({
//         pageLayout: {
//           ...state.pageLayout,
//           openMiniSidenav: true,
//         },
//       }));
//     } 
//     if (innerWidth >= 1280){
//       set((state) => ({
//         pageLayout: {
//           ...state.pageLayout,
//           openMiniSidenav: false,
//         },
//       }));
//     }

//   };
//   const handleWindowScroll = () => {
//     const {pageYOffset } = window;

//     if (pageYOffset >= 70) {
//       set((state) => ({
//        pageLayout: {
//          ...state.pageLayout,
//          headnavStick: true,
//        },
//      }));
//     //  console.log(pageYOffset)
//     //  console.log('stick')
//      }
//      if (pageYOffset <= 70) {
//       set((state) => ({
//        pageLayout: {
//          ...state.pageLayout,
//          headnavStick: false,
//        },
//      }));
//     //  console.log(pageYOffset)
//     //  console.log('remove')
//      }

//   };
  
//   window.addEventListener('resize', handleWindowResize);
//   window.addEventListener('scroll', handleWindowScroll)

//   return {
//     pageLayout: {
//       openSidenav: true,
//       openMiniSidenav: false,
//       openConfigurator:false,
//       openLanguageConfigurator:false,
//       headnavStick:false,
//     },
//     updatePageLayout: (targetValue, newState) => {
//       set((state) => ({
//         pageLayout: {
//           ...state.pageLayout,
//           [targetValue]: newState,
//         },
//       }));
//     },
//     checkPageLayout: () => {
//      handleWindowResize();
//      handleWindowScroll();
//     },
//   };
// }, {
//   name: 'page-layout-storage', // A unique name for the storage, so multiple stores don't conflict
//   torage: {
//     getItem: (key) => JSON.parse(localStorage.getItem(key)),
//     setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
//   }, // Convert string back to object when retrieving from local storage
// }));