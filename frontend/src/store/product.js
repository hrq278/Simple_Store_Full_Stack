import { create } from "zustand"

export const useProductStore = create((set)=>({
    products:[],
    setProducts :(products) =>set({ products }),

    createProduct: async(newProduct)=>{
        if (!newProduct.name  || !newProduct.price || !newProduct.image) {
            return {message: "please fill in all fields. ", success:false};
        }

        const res = await fetch("http://localhost:5000/api/products", {
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
    },
    fetchProducts: async () => {

        const res= await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        set({products:data.data})
    },
    deleteProduct: async (pid) => {
        const res= await fetch(`http://localhost:5000/api/products/${pid}`,{
            method:"DELETE",
        });
        const data = await res.json()
        if (!data.success) {
            return { success: false, message: data.message}
        }

        set(state => ({products: state.products.filter(product => product._id!==pid) })) //update the UI immediately
                return { success : true, message: data.message}

    },
    updateProduct: async (pid, updatedProduct) => {

        try {
            
            const res = await fetch(`http://localhost:5000/api/products/${pid}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatedProduct),
            })       
            
            const data = await res.json()
            if (!data.success) {
                return {success: false, message:data.message}
            }
            //update the UI without needing a refresh
            set( state =>({
                products: state.products.map((product)=>(product._id === pid ? data.data : product))
            }))
             return { success : true, message: data.message}
        }
        catch (error) {
                console.log("Error in Updating the Product. Error : ", error)
                return { success: false, message: "Something went wrong" };  
        }
    }

}));

