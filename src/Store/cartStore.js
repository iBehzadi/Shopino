import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],

  // add item to cart
  addToCart: (product) =>
    set((state) => {
      // check exist item
      const exist = state.items.find(
        (item) => item.documentId === product.documentId,
      );

      if (exist) {
        return {
          items: state.items.map((item) =>
            item.documentId === product.documentId
              ? {
                  ...item,
                  cartQuantity: item.cartQuantity + 1,
                }
              : item,
          ),
        };
      }
      // if does not exist
      return {
        items: [
          ...state.items,
          {
            ...product,
            cartQuantity: 1,
          },
        ],
      };
    }),

  // decrease item
  decreaseQuantity: (documentId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.documentId === documentId
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item,
        )
        .filter((item) => item.cartQuantity > 0),
    })),

  // increase item
  increaseQuantity: (documentId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.documentId === documentId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item,
      ),
    })),

  // remove from cart
  removeFromCart: (documentId) =>
    set((state) => ({
      items: state.items.filter((item) => item.documentId !== documentId),
    })),

  // clear cart
  clearCart: () =>
    set({
      items: [],
    }),
}));
