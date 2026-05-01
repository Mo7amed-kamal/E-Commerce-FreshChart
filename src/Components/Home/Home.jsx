import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 40; // عدد المنتجات في الصفحة 

  const { addProductToCart, setCartItemNo } = useContext(CartContext);

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  function getProducts(page) {
    setIsLoading(true);
    axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.metadata.numberOfPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  async function addCartItem(id) {
    let data = await addProductToCart(id);

    if (data?.data?.status === "success") {
      setCartItemNo((prev) => prev + 1);
      toast.success(data.data.message, {
        position: "top-right",
        theme: "dark",
      });
    } else {
      toast.error(data.response.data.message, {
        position: "top-right",
        theme: "dark",
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="container mx-auto py-4">
        <MainSlider />
        <CategoriesSlider />

        <div className="row">
          {isLoading ? ( <Loader />) : ( products.map((product) => (<ProductItem
                key={product.id}
                product={product}
                addCart={addCartItem}
              />))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
