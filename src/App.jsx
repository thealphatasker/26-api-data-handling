import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProductsForm, setNewProductsForm] = useState({
    id: 0,
    name: "",
    price: 0,
    desc: "",
    img: "",
  });

  const handleNewProductsFormChange = (e) => {
    setNewProductsForm({
      ...newProductsForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiRes = await axios.get("http://localhost:8000/products");
        setProducts(apiRes.data);
        console.log(apiRes.data);
      } catch (err) {
        alert("Something went wrong!");
      }
    };
    fetchProducts();
  }, []);

  async function saveProduct(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/products", {
        id: newProductsForm.id,
        name: newProductsForm.name,
        price: newProductsForm.price,
        desc: newProductsForm.desc,
        img: newProductsForm.img,
      });
      alert("Data has been Saved!");

      const apiRes = await axios.get("http://localhost:8000/products");
      setProducts(apiRes.data);

      // Reset the form!!!!
      setNewProductsForm({
        id: 0,
        name: "",
        price: 0,
        desc: "",
        img: "",
      });
    } catch (err) {
      alert("Hmm ? :/");
    }
  }

  return (
    <>
      <div className="main-heading">
        <h1>API Data Handling</h1>
      </div>
      <br />
      <form onSubmit={saveProduct}>
        <input
          type="number"
          name="id"
          id="id"
          placeholder="Enter your product's id"
          onChange={handleNewProductsFormChange}
        />
        <br />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your product's name"
          onChange={handleNewProductsFormChange}
        />
        <br />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter your product's price"
          onChange={handleNewProductsFormChange}
        />
        <br />
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter your product's description"
          onChange={handleNewProductsFormChange}
        />
        <br />
        <input
          type="text"
          name="img"
          id="img"
          placeholder="Enter your product's Image URL"
          onChange={handleNewProductsFormChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="products">
        {products.map((pr) => {
          return (
            <div key={pr.id} className="product-card">
              <img src={pr.img} alt={pr.name} />
              <h3 className="product-name">{pr.name}</h3>
              <p className="product-price">${pr.price}</p>
              <p className="product-desc">{pr.desc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
