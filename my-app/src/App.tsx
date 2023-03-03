import React, { useState } from 'react';
import './App.css';

interface Product {
  id: string;
  name: string;
  qty: string;
  price: string;
}

const App = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [item, setItem] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    qty: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      product.id === '' ||
      product.name === '' ||
      product.qty === '' ||
      product.price === ''
    ) {
      setFormErrors(validate(product));
    } else {
      item.push(product);
      setItem([...item]);
      setProduct({
        id: '',
        name: '',
        qty: '',
        price: '',
      });
      setFormErrors({});
    }
  };

  const handleDelete = (param: Product) => {
    const deleteItem = item.filter((item, index) => item.id !== param.id);
    setItem([...deleteItem]);
    console.log(param);
  };

  const validate = (values: Product) => {
    const errors: Record<string, string> = {};
    if (!values.id) {
      errors.id = 'Product id is required!';
    }
    if (!values.name) {
      errors.name = 'Product name is required!';
    }
    if (!values.qty) {
      errors.qty = 'Product qty is required!';
    }
    if (!values.price) {
      errors.price = 'Product price is required!';
    }
    return errors;
  };

  return (
    <div className="grid grid-cols-2 mt-56">
      <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="uppercase text-2xl text-center">add product</h1>
          <form onSubmit={handleSubmit}>
            <label className="block">ID</label>
            <input
              name="id"
              value={product.id}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Input product ID"
            />
            <p className="text-red-900">{formErrors.id}</p>
            <br />
            <label className="block">Product Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Input product Name"
            />
            <p className="text-red-900">{formErrors.name}</p>
            <br />
            <label className="block">QTY</label>
            <input
              name="qty"
              value={product.qty}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Input product QTY"
            />
            <p className="text-red-900">{formErrors.qty}</p>
            <br />
            <label className="block">Price</label>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Input product Price"
            />
            <p className="text-red-900">{formErrors.price}</p>
            <br />
            <button className="px-10 py-2 text-md text-white bg-gray-700 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-3 gap-4">
          {item.map((res, index) => {
            return (
              <div className="bg-white p-5 rounded-xl" key={index}>
                <button
                  onClick={() => handleDelete(res)}
                  className="float-right bg-red-500 px-2 text-white rounded-full"
                >
                  x
                </button>
                <div className="mt-6 text-center">
                  <div className="flex space-x-4 items-center">
                    <h1>Product ID:</h1>
                    <p className="text-xl">{res.id}</p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <h1>Product Name:</h1>
                    <p className="text-xl">{res.name}</p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <h1>Product QTY:</h1>
                    <p className="text-xl">{res.qty}</p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <h1>Product Price:</h1>
                    <p className="text-xl">{res.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
