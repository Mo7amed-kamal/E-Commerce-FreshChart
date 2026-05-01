import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// const headers = {
//     token: window.localStorage.getItem("token")
// }

export let WishListContext =  createContext()


// function AddProductToWishlist(productId){
//     return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,
//         {productId},
//         {
//             headers: {
//               token: localStorage.getItem("token")
//             }
//         }
      
//     ).then( res => {
//         if(res?.data?.status === "success" ){


//             toast.success(res.data.message, {
//                 position: "top-right",
//                 theme: "dark",
//             })
//         }
//         console.log(res)
//     })
//     .catch(err => console.log(err))
// }

// function getWishlist() {
//     return axios.get(
//       'https://ecommerce.routemisr.com/api/v1/wishlist',
//       {
//         headers: {
//           token: localStorage.getItem("token")
//         }
//       }
//     )
//   }
  

//     function removeWishlist(productId) {
//         return axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${productId} `,
//             {
//                 headers: {
//                   token: localStorage.getItem("token")
//                 }
//             }

//          ).then(res => res)
//          .catch(err => err)
     
//     }



    export default function WishListContextProvider({ children }) {
    
      const [wishlistIds, setWishlistIds] = useState([]);
      const token = localStorage.getItem("token");
      const [countProduct,setCountProduct] = useState(0) 

      // ✅ إضافة
      function AddProductToWishlist(productId) {
        return axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        ).then(res => {
          if (res?.data?.status === "success") {
    
            setWishlistIds(prev => [...prev, productId]); 
            setCountProduct( (prev) => prev + 1 )
            toast.success(res.data.message, {
              position: "top-right",
              theme: "dark",
            });
          }
          return res;
        }).catch(err => err);
      }
    
      // ✅ جلب الـ wishlist
      function getWishlist() {
        return axios.get(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        ).then(res => {
            setCountProduct( (prev) => prev + 1 )
          const ids = res.data.data.map(item => item._id);
          setWishlistIds(ids); // 🔥 مهم
    
          return res;
        });
      }
    
      // ✅ حذف
      function removeWishlist(productId) {
        return axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        ).then(res => {
            
          setWishlistIds(prev =>
            prev.filter(id => id !== productId)
          ); //  مهم
    
          return res;
        }).catch(err => err);
      }

      useEffect(() => {
        if (token) {
          getWishlist();
        }
      }, []);
    
      return (
        <WishListContext.Provider
          value={{
            AddProductToWishlist,
            getWishlist,
            removeWishlist,
            wishlistIds, // ✅ تصديرها
            countProduct,
            setCountProduct
          }}
        >
          {children}
        </WishListContext.Provider>
      );
    }
    