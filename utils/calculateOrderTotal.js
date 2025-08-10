export const calculateOrderTotal = (orderItems) => {
  let total = 0;

  for (const item of orderItems) {
    const price = item.price || 0;
    const quantity = item.quantity || 1;

    let itemTotal = price * quantity;

    for (const c of item.customizations || []) {
      if (c.type === "addon" && c.price) {
        const addonTotal = c.price * (c.quantity || 1) * quantity;
        itemTotal += addonTotal;
      }
    }

    total += itemTotal;
  }

  return total;
};
