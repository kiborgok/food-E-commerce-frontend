const BASE_URL = "https://mathe-food-api.herokuapp.com";

export async function addProduct(product) {
  try {
    const response = await fetch(BASE_URL + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
            name: product.name,
            description: product.description,
            imageSrc: product.imageSrc,
            price: product.price
      }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const response = await fetch(BASE_URL + "/products");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
