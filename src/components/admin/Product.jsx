import { useState } from "react";
import {
  addProduct,
  deleteProduct
} from "../../api/product";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../api/firebaseConfig";

const storage = getStorage(app);

export default function ProductsTable({ setProducts, products}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  function handleChange(e) {
    let { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  }

  const handleDelete = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    deleteProduct(id);
  };

  function handleImageChange(e) {
    e.preventDefault();
    const file = e.target?.files[0];

    if (!file) return alert("Input an image");

    const storageRef = ref(storage, `biz-photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imgUrl) return alert("Please choose an image");
    const productObj = {
      ...product,
      imageSrc: imgUrl,
    };
    const response = await addProduct(productObj);
    setProducts([...products, response]);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <form
        className="mb-8 space-y-4 w-full md:w-2/4 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="rounded-md shadow-sm space-y-2">
          <h1 className="py-3 text-lg">Add Product</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              id="default_size"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {progresspercent > 0 && progresspercent < 100 ? (
              <span className="text-red-600">
                {`Uploading... ${progresspercent}%`}
              </span>
            ) : progresspercent === 100 ? (
              <span className="text-green-600">Upload complete</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price" className="sr-only">
              Price
            </label>
            <div className="flex">
              <input
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Ksh. 200"
                value={product.price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mb-7 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add Product
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product["id"]}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {product["id"]}
              </th>
              <td className="px-6 py-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={product.imageSrc}
                  alt={product.name}
                />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
