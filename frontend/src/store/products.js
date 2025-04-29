import {create} from "zustand";
export const useProductStore = create((set)=>({
    products:[],
    setProducts:(products)=>set({products}),
    createProduct: async ( newProduct )=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false,message:"Please fill all the fields"}
        }
        const res= await fetch("/api/products",{
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
    }
}));