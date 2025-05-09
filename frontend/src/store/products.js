import {create} from "zustand";
import { apiBaseUrl } from "../config.js";

export const useProductStore = create((set)=>({
    products:[],
    setProducts:(products)=>set({products}),
    createProduct: async ( newProduct )=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false,message:"Please fill all the fields"}
        }
        const res= await fetch(`${apiBaseUrl}/products`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newProduct),
        });
        const data = await res.json();
        if(res.ok){
            set((state)=>({products:[...state.products,data.data]}))  //it mean keep the old products and add the new product
            return {success:true,message:"Product created successfully"}
        }else{
            return {success:false,message:data.message}
        }
    },
   fetchProducts: async ()=>{
    const res = await fetch(`${apiBaseUrl}/products`);
    const data = await res.json();
    set({products:data.data});
   },
   deleteProduct: async (pid)=>{
    const res = await fetch(`${apiBaseUrl}/products/${pid}`,{
        method:"DELETE",
    });
    const data = await res.json();
    if(!data.success) return {success:false, message:data.message};
    set((state)=>({products:state.products.filter((product)=>product._id !==pid)}));
    return {success:true, message:"Product deleted successfully"};
   },
   updateProduct: async (pid,updatedProduct)=>{
    const res = await fetch(`${apiBaseUrl}/products/${pid}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if(!data.success) return {success:false,message:data.message};
    // update the ui immediately,without need to refresh the page
    set((state)=>({products:state.products.map((product)=>product._id ===pid?data.data:product)}))
    return {success:true, message:"Product updated successfully"}
   }
}));