const BASE_URL = "https://mathe-food-api.herokuapp.com";

export async function addOrder(order) {
  try {
    const response = await fetch(BASE_URL + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: order.name,
        email: order.email,
        location: order.location,
        phone: order.phone,
        amount: order.amount,
        shipping: order.shipping,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
