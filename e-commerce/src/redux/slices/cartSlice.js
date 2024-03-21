import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(
      window.localStorage.getItem(
        JSON.parse(window.localStorage.getItem("user"))?.id
      )
    )?.cart,
    bill: JSON.parse(
      window.localStorage.getItem(
        JSON.parse(window.localStorage.getItem("user"))?.id
      )
    )?.bill,
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log(state);
      const prod = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === prod.id &&
            product.size === prod.size &&
            product.color === prod.color
        );
        console.log(exist);
        if (exist) {
          state.bill += prod.price * (prod.quantity - exist.quantity);
          exist.quantity = prod.quantity;
        } else {
          state.cart.push({
            id: prod.id,
            name: prod.name,
            quantity: prod.quantity,
            price: prod.price,
            image: prod.image,
            color: prod.color,
            size: prod.size,
          });
          state.bill += prod.price * prod.quantity;
        }
      } catch (err) {
        return err;
      }
    },
    cartIncrement: (state, action) => {
      console.log(state);
      const prod = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === prod.id &&
            product.size === prod.size &&
            product.color === prod.color
        );
        console.log(exist);
        state.bill += exist.price;
        exist.quantity++;
      } catch (err) {
        return err;
      }
    },
    cartDecrement: (state, action) => {
      console.log(state);
      const prod = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === prod.id &&
            product.size === prod.size &&
            product.color === prod.color
        );
        console.log(exist);
        if (exist.quantity === 1) {
          state.bill -= exist.price;
          state.cart = state.cart.filter(
            (product) =>
              product.id !== prod.id ||
              product.size !== prod.size ||
              product.color !== prod.color
          );
        } else {
          exist.quantity--;
          state.bill -= exist.price;
        }
      } catch (err) {
        return err;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productId.id &&
            product.size === productId.size &&
            product.color === productId.color
        );

        state.cart = state.cart.filter(
          (product) =>
            product.id !== productId.id ||
            product.size !== productId.size ||
            product.color !== productId.color
        );
        state.bill -= exist.price * exist.quantity;
      } catch (err) {
        return err;
      }
    },
    deleteAllFromCart(state, action) {
      try {
        state.cart = state.cart.filter((product) => product.id === "1");
        state.bill = 0;
      } catch (err) {
        return err;
      }
    },
  },
});

export const {
  addToCart,
  cartIncrement,
  cartDecrement,
  removeFromCart,
  deleteAllFromCart,
} = cartSlice.actions;

export const cartSelector = createSelector(
  (state) => state.cart,
  (state) => state
);

export default cartSlice.reducer;
