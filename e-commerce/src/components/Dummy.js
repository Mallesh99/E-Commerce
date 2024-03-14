addToCart(state, action) {
  const productId = action.payload;
  try {
    const exist = state.cart.find(
      (product) =>
        product.id === productId.id &&
        product.size === productId.size &&
        product.color === productId.color
    );
    if (exist) {
      exist.amount++;
      exist.totalPrice += productId.price;
      state.totalAmount++;
      state.totalPrice += productId.price;
    } else {
      state.cart.push({
        id: productId.id,
        price: productId.price,
        size: productId.size,
        amount: 1,
        img: productId.img,
        totalPrice: productId.price,
        name: productId.name,
        text: productId.text,
        color: productId.color,
      });
      state.totalAmount++;
      state.totalPrice += productId.price;
    }
  } catch (err) {
    return err;
  }
}