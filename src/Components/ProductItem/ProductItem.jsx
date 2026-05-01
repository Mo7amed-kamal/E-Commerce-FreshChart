import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishListContext } from '../Context/WishListContext';

export default function ProductItem({ product, addCart, removeItem  }) {

  let { AddProductToWishlist, removeWishlist, wishlistIds } =
    useContext(WishListContext);

  const isWishlisted = wishlistIds.includes(product.id);

  function toggleWishlist() {
    if (isWishlisted) {
      if (removeItem) {
        removeItem(product.id);   //  Wishlist page
      } else {
        removeWishlist(product.id); //  Home page
      }
    } else {
      AddProductToWishlist(product.id);
    }
  }
  

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2'>
      <div className="product relative rounded p-4  group ">

        <i onClick={toggleWishlist}
          className={`fa-heart fa-2x  cursor-pointer absolute top-3 right-3
                    opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300
            ${isWishlisted ? "fa-solid text-red-600" : "fa-regular text-gray-400"}`}
        ></i>

        <Link to={`/productDetails/${product.id}`}>
          <img src={product.imageCover} className='w-full' alt="" />
          <span className='text-main'>{product.category?.name}</span>
          <h2>{product.title?.split(" ").slice(0,2).join(" ")}</h2>
          <div className='flex justify-between items-center mt-3'>
              <p>{product.price} EGP</p>
              <span> {product.ratingsAverage} </span>
          </div>
         <div className='text-center my-1'>
         <i className="fa-solid fa-star rating-color"></i>
          <i className="fa-solid fa-star rating-color"></i>
          <i className="fa-solid fa-star rating-color"></i>
          <i className="fa-solid fa-star "></i>
         </div>
       
        </Link>

        <button
          onClick={() => addCart(product.id)}
          className='btn bg-main text-white w-full rounded p-2 mt-2'>
          <i className="fa-solid fa-cart-shopping"></i> Add
        </button>

      </div>
    </div>
  );
}
