import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from "immer";
import { useEffect } from 'react';


export const useCartManagertState = create(

  (set, get) => ({
    cart: [],
    totalPrice: 0,
    isAddToCartLoading: false,
    addToCartSuccessMessage: "",
    addToCartSuccess: false,
    addToCartErrorMessage: "",
    addToCartError: false,
    addToCart: (productId, productName, productQuantity, productPrice) => {
      try {
        set(
          produce((draft) => {
            draft.isAddToCartLoading = true;
          })
        );

        set(
          produce((draft) => {
            let productExists = get().cart.some(
              (product) => product.productId === productId
            );
            if (productExists) {
              const newCart = get().cart.map((p) =>
                p.productId === productId
                  ? {
                    ...p,
                    productQuantity: p.productQuantity + productQuantity,
                    productTotalPrice: p.productTotalPrice + productPrice,
                  }
                  : p
              );

              draft.cart = newCart;
            } else {
              draft.cart.push({
                productId,
                productName,
                productQuantity,
                productPrice,
                productTotalPrice:productPrice,
              });
            }


            draft.isAddToCartLoading = false;
            draft.addToCartSuccessMessage = "Product added to cart successfully";
            draft.addToCartSuccess = true;
          })
        );
      } catch (error) {
        console.log(error);
        return produce((draft) => {
          draft.isAddToCartLoading = false;
          draft.addToCartErrorMessage = "Error occurred while adding product to cart";
          draft.addToCartError = true;
        });
      }
    },
    removeFromCart : (productId) => {
      try{
        set(
          produce((draft) => {
            draft.isAddToCartLoading = true;
          })
        );

        set(
          produce((draft) => {
            draft.cart = get().cart.filter((product) => product.productId !== productId);
            draft.isAddToCartLoading = false;
          })
        );

      }
      catch(error){
        console.log(error);
        return produce((draft) => {
          draft.isAddToCartLoading = false;
        });
      }
    },
    increaseCartQuantity : (productId,productQuantity) => {
      try {
        set(
          produce((draft) => {
            draft.isAddToCartLoading = true;
          })
        );

        set(
          produce((draft) => {
            let productExists = get().cart.some(
              (product) => product.productId === productId
            );
            if (productExists) {
              const newCart = get().cart.map((p) =>
                p.productId === productId
                  ? {
                    ...p,
                    productQuantity: p.productQuantity + productQuantity,
                    productTotalPrice: p.productTotalPrice + p.productPrice,
                  }
                  : p
              );

              draft.cart = newCart;
            } 

            draft.isAddToCartLoading = false;
          })
        );
      } catch (error) {
        console.log(error);
        return produce((draft) => {
          draft.isAddToCartLoading = false;
          draft.addToCartErrorMessage = "Error occurred while adding product to cart";
          draft.addToCartError = true;
        });
      }
    },    
    decreaseCartQuantity: (productId, productQuantity) => {
      try {
        set(
          produce((draft) => {
            draft.isAddToCartLoading = true;
          })
        );
    
        set(
          produce((draft) => {
            draft.cart = get().cart.length == 0 ? [] : get().cart;
            let productExists = get().cart.some(
              (product) => product.productId === productId
            );
            if (productExists) {
              const newCart = get().cart.map((p) => {
                if (p.productId === productId) {
                  const newQuantity = p.productQuantity - productQuantity;
                  if (newQuantity < 1) {
                    // remove the product if the quantity is less than 1
                    return null;
                  } else {
                    return {
                      ...p,
                      productQuantity: newQuantity,
                      productTotalPrice: p.productPrice * newQuantity,
                    };
                  }
                } else {
                  return p;
                }
              }).filter(Boolean); // remove null values from the array
    
              draft.cart = newCart;
            }
    
            draft.isAddToCartLoading = false;
          })
        );
      } catch (error) {
        console.log(error);
        return produce((draft) => {
          draft.isAddToCartLoading = false;
          draft.addToCartErrorMessage = "Error occurred while adding product to cart";
          draft.addToCartError = true;
        });
      }
    },
    clearCart: () => {

      try {
        set(
          produce((draft) => {
            draft.isAddToCartLoading = true;
          })
        );
    
        set(
          produce((draft) => {
            draft.cart = [];
            draft.isAddToCartLoading = false;
          })
        );
      } catch (error) {
        console.log(error);
        return produce((draft) => {
          draft.isAddToCartLoading = false;
          draft.addToCartErrorMessage = "Error occurred while adding product to cart";
          draft.addToCartError = true;
        });
      }
    }
    
    

  }),
);

export const useCart = () => {
  const cart = useCartManagertState((state) => state.cart);
  const isAddToCartLoading = useCartManagertState(
    (state) => state.isAddToCartLoading
  );
  const totalPrice = useCartManagertState((state) => state.totalPrice);
  const addToCartSuccessMessage = useCartManagertState(
    (state) => state.addToCartSuccessMessage
  );
  const addToCartSuccess = useCartManagertState(
    (state) => state.addToCartSuccess
  );
  const addToCartErrorMessage = useCartManagertState(
    (state) => state.addToCartErrorMessage
  );
  const addToCartError = useCartManagertState((state) => state.addToCartError);

  useEffect(() => {
    const priceState = cart.reduce(
      (total, product) => total + product.productTotalPrice,
      0
    );
    useCartManagertState.setState((state) => ({
      totalPrice: priceState
    }));
  }, [cart]);

  return { cart, isAddToCartLoading, totalPrice };
};

export const useAddToCart = () => useCartManagertState((state) => state.addToCart)
export const useRemoveFromCart = () => useCartManagertState((state) => state.removeFromCart)
export const useIncreaseCartQuantity = () => useCartManagertState((state) => state.increaseCartQuantity)
export const useDecreaseCartQuantity = () => useCartManagertState((state) => state.decreaseCartQuantity)
export const useClearCart = () => useCartManagertState((state) => state.clearCart)



