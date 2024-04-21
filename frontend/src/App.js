import './App.css';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";


const App = () => {

  const [viewer, setViewer] = useState(0);
  //const [dataF, setDataF] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8082/listProducts');
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  function Read() { // viewer = 0

    const render_products = (products) => {
      return (
      <div>
        <h2>Products (Scroll down for search)</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {products.map((product, index) => (
            <div key={index} className="card shadow-sm">
              <img src={product.image} className="card-img-top" alt="picture"></img>
              <div className="card-body">
                <p className="card-text">{product.id} <strong>{product.title}</strong> ${product.price}</p>
                <p className="card-text">{product.category}</p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      );
    };

    const getInputValue = async () => {
      const id = document.forms["my_form"]["inputProductNum"].value;
      try {
        const response = await fetch(`http://localhost:8082/${id}`)
        const product = await response.json();
        setSearch(product);
      } catch (error) {
        console.error('Error ', error);
        setSearch(null);
      }
    };

    function RenderSearch() {
      if (!search) return <div>No Product Searched.</div>;
      return (
        <div className="card shadow-sm">
              <img src={search.image} className="card-img-top" alt="picture"></img>
              <div className="card-body">
                <p className="card-text">{search.id} <strong>{search.title}</strong> ${search.price}</p>
                <p className="card-text">{search.category}</p>
                <p className="card-text">{search.description}</p>
              </div>
          </div>
      );
    };

    return (
      <div>
        <button type="button" onClick={() => setViewer(1)}>Add Product!</button>
        <button type="button" onClick={() => setViewer(2)}>Update a Product's Price!</button>
        <button type="button" onClick={() => { setViewer(3); setSearch(null) }}>Remove a Product!</button>
        <button type="button" onClick={() => setViewer(4)}>Student Page!</button>

        <div>
        {render_products(products)}
        </div>

        <div>
        <h2>Search</h2>
        <form id="my_form">
          <p>Find a Product! <input type="text" name="inputProductNum" placeholder="Enter Product ID"/></p>
        </form>
        <button type="button" onClick={() => getInputValue()}style={{ width: '70px', height: '30px' }}>Search</button>
        </div>
        <RenderSearch />
      </div>
    );
  };

  function Create() { // viewer = 1
    const onSubmit = async (data) => {
      try {
        const response = await fetch("http://localhost:8082/addProduct", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify ({
            "id": Number(data.productID),
            "title": data.productTitle,
            "price": Number(data.productPrice),
            "description": data.productDesc,
            "category": data.productCategory,
            "image": data.productImage
          })
        })

        const result = await response.json();
        await fetchProducts();
        setViewer(0);
        //setDataF(data);
      } catch (error) {
        console.error('Failed to add the product: ', error);
      }
    }

    return (
      <div>
        <div class="form">
          <h1>New Product Information</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="container mt-5" style={{ width: 500 }}>

            <input
              {...register("productID", {required: true})}
              placeholder="Product ID"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px'}}
            />
            {errors.productID && (
              <p className="text-danger">Product ID is required.</p>
            )}

            <input
              {...register("productTitle", {required: true})}
              placeholder="Product Title"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px' }}
            />
            {errors.productTitle && (
              <p className="text-danger">Product title is required.</p>
            )}

            <input
              {...register("productPrice", {required: true})}
              placeholder="Product Price"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px' }}
            />
            {errors.productPrice && (
              <p className="text-danger">Product price is required.</p>
            )}

            <input
              {...register("productDesc", {required: true})}
              placeholder="Product Description"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px' }}
            />
            {errors.productDesc && (
              <p className="text-danger">Product description is required.</p>
            )}

            <input
              {...register("productCategory", {required: true})}
              placeholder="Product Category"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px' }}
            />
            {errors.productCategory && (
              <p className="text-danger">Product category is required.</p>
            )}

            <input
              {...register("productImage", {required: true})}
              placeholder="Product Image Link"
              className="form-control placeholder-red-500"
              style={{ marginBottom : '10px'}}
            />
            {errors.productImage && (
              <p className="text-danger">Product image link is required.</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ alignItems: "center" }}>Submit</button>
          </form>
        </div>
        <button type="button" onClick={() => setViewer(0)}>Back to Products Page!</button>
      </div>
    )
  }

  function Update() { // viewer = 2

    const getInputValue = async () => {
      const id = document.forms["my_form"]["inputProductNum"].value;
      try {
        const response = await fetch(`http://localhost:8082/${id}`)
        const product = await response.json();
        setSearch(product);
      } catch (error) {
        console.error('Error ', error);
        setSearch(null);
      }
    };

    function RenderSearch() {
      if (!search) return <div>No Product Searched.</div>;
      return (
        <div className="card shadow-sm">
              <img src={search.image} className="card-img-top" alt="picture"></img>
              <div className="card-body">
                <p className="card-text">{search.id} <strong>{search.title}</strong> ${search.price}</p>
                <p className="card-text">{search.category}</p>
                <p className="card-text">{search.description}</p>
              </div>
          </div>
      );
    };

    const updateProduct = async() => {
      const id = search.id;
      const newPrice = Number(document.getElementById("updatePrice").value);

      try {
        const response = await fetch(`http://localhost:8082/updatePrice/${id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(
            {
              "id": search.id,
              "title": search.title,
              "price": newPrice,
              "description": search.description,
              "category": search.category,
              "image": search.image
            }
          )
        })
        await fetchProducts();
        setViewer(0);
      } catch (error) {
        console.error('Error ', error);
      }
    }

    return (
      <div>
        <div>
          <h2>Search</h2>
          <form id="my_form">
            <p>Update a Product! <input type="text" name="inputProductNum" placeholder="Enter Product ID"/></p>
          </form>
          <button type="button" onClick={() => getInputValue()}style={{ width: '70px', height: '30px' }}>Search</button>
          </div>
        <RenderSearch />
        <p>New Price: <input type="number" id="updatePrice" name="updateProductPrice" placeholder="Enter Product Prime"/></p>
        <button type="button" onClick={() => { updateProduct(); setSearch(null) }}>Update!</button>
      </div>
    )
  }

    function Delete() { // viewer = 3

      const getInputValue = async () => {
        const id = document.forms["my_form"]["inputProductNum"].value;
        try {
          const response = await fetch(`http://localhost:8082/${id}`)
          const product = await response.json();
          setSearch(product);
        } catch (error) {
          console.error('Error ', error);
          setSearch(null);
        }
      };
  
      function RenderSearch() {
        if (!search) return <div>No Product Searched.</div>;
        return (
          <div className="card shadow-sm">
                <img src={search.image} className="card-img-top" alt="picture"></img>
                <div className="card-body">
                  <p className="card-text">{search.id} <strong>{search.title}</strong> ${search.price}</p>
                  <p className="card-text">{search.category}</p>
                  <p className="card-text">{search.description}</p>
                </div>
            </div>
        );
      };

      const removeProduct = async () => {
        let id = search.id;
        try {
          const response = await fetch(`http://localhost:8082/deleteProduct/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
              { "id": id }
            )
          })
          const result = await response.json();
          await fetchProducts();
          setViewer(0);
        } catch (error) {
          console.error('Error ', error);
        }
      }

    return (
      <div>
        <div>
          <h2>Search</h2>
          <form id="my_form">
            <p>Remove a Product! <input type="text" name="inputProductNum" placeholder="Enter Product ID"/></p>
          </form>
          <button type="button" onClick={() => getInputValue()}style={{ width: '70px', height: '30px' }}>Search</button>
          </div>
        <RenderSearch />

        <button type="button" onClick={() => { removeProduct(); setSearch(null) }}>Delete</button>
      </div>
    )
  }

  function StudentView() { // viewer = 4

    return (
      <div>
        <h4>COM S 319 Construction of User Interfaces</h4>
        <p>
          Felicia Atterling, feliciaa@iastate.edu <br />
          Brayden Atkinson, bma2026@iastate.edu <br />
          21, April 2024 <br />
          <strong>Abraham Aldaco, Ph.D. <br /></strong>
        </p>
        <button type="button" onClick={() => setViewer(0)}>Back to Main Page!</button>
      </div>
    );
  };

  return (
    <div>
      {viewer === 0 && <Read />}
      {viewer === 1 && <Create />}
      {viewer === 2 && <Update />}
      {viewer === 3 && <Delete />}
      {viewer === 4 && <StudentView />}
    </div>
  );
}

export default App;
