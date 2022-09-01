import React from 'react';
import {ProductList} from "../helpers/ProductList";
import ProductItem from "../components/ProductItem";
import "../styles/Products.css";

function Products() {
  return (
    <div className='products'>
        <h1 className='productTitle'>Featured Products</h1>
          <div className='productList'>
          {ProductList.map((productItem, key) => {
          return (
            <ProductItem
              key={key}
              image={productItem.image}
              name={productItem.name}
              brand={productItem.brand}
              price={productItem.price}
            />
          );
        })}
        </div>
        <h1 className='productTitle'>Products</h1>
    </div>
  )
}

export default Products