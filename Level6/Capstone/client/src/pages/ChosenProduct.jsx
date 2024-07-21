import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../cssFiles/chosenproduct.css';
import axios from 'axios';

//fetch product by id.
const fetchProductById = async (id) => {
  console.log("test")
  try {
    const response = await axios.get(`/api/inventory/${id}`)
    console.log("response: ", response.data)
    console.log("id:", id)
    return response.data
  } catch (error) {
    console.error('Error fetching product: ', error)
    throw error
  }
};

//fetch related products
const fetchRelatedProducts = async (category) => {
  try {
    const response = await axios.get(`/api/inventory`, { params: { category } })
    console.log("response: ", response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching related products.', error)
    throw error
  }
};

const ChosenProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const getProduct = async () => {
        try {
            const productData = await fetchProductById(id);
            console.log("product data:", productData)
            setProduct(productData);
            const relatedData = await fetchRelatedProducts(productData.category);
            setRelatedProducts(relatedData.filter(
              item => item._id !== productData._id)
            );
        } catch(err){
            setError(err.message)
        }
    };

    getProduct();
  }, [id]);

  if (error) return <div>Error: {error}</div>
  if (!product) return <div>Loading...</div>;

  return (
    <div className="chosen-product-container">
      <div className="product-details">
        <img src={product.imageUrl} alt={product.title} />
        <div className='product-info'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {product.category === 'Appliance Part' && (
            <>
              <p>Part Number: {product.partNumber}</p>
              <p>Manufacturer: {product.manufacturer}</p>
            </>
          )}
          {product.category === 'Book' && (
            <>
              <p>Genre: {product.genre}</p>
              <p>Year Published: {product.yearPublished}</p>
              <p>Publisher: {product.publisher}</p>
              <p>Pages: {product.pages}</p>
              <p>Cover: {product.cover}</p>
              <p>Author: {product.author}</p>
            </>
          )}
          {product.category === 'Pet Product' && (
            <p>Brand: {product.brand}</p>
          )}
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity: </label>
            <select 
              id="quantity" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[...Array(25).keys()].map(n => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
          <button className="buy-now-button">Buy Now</button>
        </div>
      </div>  
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.map(item => (
            <div key={item._id} className="related-product-card">
              <Link to={`/product/${item._id}`}>
                <img src={item.imageUrl} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChosenProduct;
