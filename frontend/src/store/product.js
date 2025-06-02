import { create } from "zustand"

export const useProductStore = create((set)=>({
    products:[],
    setProducts :(products) =>({ products }),

    createProduct: async(newProduct)=>{
        if (!newProduct.name  || !newProduct.price || !newProduct.image) {
            return {message: "please fill in all fields. ", success:false};
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers:{
                "Content-Type" :"application/json"
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state)=>({
            products: [...state.products, data.data]
        }))

         return {message: "Product Created Successfully ", success:true};
    }
}));