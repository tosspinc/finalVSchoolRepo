import React from 'react';
import { Link } from 'react-router-dom';
import '../cssFiles/inventoryitem.css';

const InventoryItem = ({ item }) => {
  return (
    <div className={`inventory-item ${item.category.replace(/\s+/g, '-').toLowerCase()}`}>
      <Link to={`/product/${item._id}`}>
        <div className="item-image">
          <img src={item.imageUrl} alt={item.title} />
        </div>
        <div className="item-info">
          <h2 className="item-title">{item.title}</h2>
          <p className="item-description">{item.description}</p>
          <p className="item-price">
            <span className='item-price-label'>Price: </span>
            <span className='item-price-amount'> ${item.price}</span>
          </p>
          {item.category === 'Appliance Part' && (
            <>
              <p className="item-part-number">Part Number: {item.partNumber}</p>
              <p className="item-manufacturer">Manufacturer: {item.manufacturer}</p>
            </>
          )}
          {item.category === 'Book' && (
            <>
              <p className="item-genre">Genre: {item.genre}</p>
              <p className="item-year-published">Year Published: {item.yearPublished}</p>
              <p className="item-publisher">Publisher: {item.publisher}</p>
              <p className="item-pages">Pages: {item.pages}</p>
              <p className="item-cover">Cover: {item.cover}</p>
              <p className="item-author">Author: {item.author}</p>
            </>
          )}
          {item.category === 'Pet Product' && (
            <p className="item-brand">Brand: {item.brand}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default InventoryItem;
