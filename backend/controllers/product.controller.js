import { Product } from "../model/product.model.js"


const addProduct = async(req,res)=>{

     const {name, price, image}= req.body
      
        if (!name || !price || !image) {
            console.log("field are required");
             return res.status(400).json({ message: "All fields are required" });
            
        }
        //console.log(name, price, image)

        try {
              const addedProduct = await Product.create(
                {
                    name,
                    price,
                    image
                }
            )
          //  console.log("addedProduct : ",addedProduct)
            return res
            .status(201)
            .json({data: addedProduct, message:"Product is Created Successfully"} )
        
        } catch (error) {
            console.log("Error While adding a Product",error)
             return res.status(500).json({ message: "Server error" });
        }
}

const updateProduct= async(req,res)=>{

    const id = req.params.id
    const { name, price, image } =req.body


    if (!name || !price || !image) {
        return res.status(400).json({message:"fields are empty"})
    }


    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { 
                name, 
                price,
                image
             },
             { new: true }
        )

        //console.log(updatedProduct)
        return res.status(200).json({data: updatedProduct,success :true, message: "Product Updated Successfully"})

    } catch (error) {
        console.log("Error While adding a Product",error)
        return res.status(500).json({ message: "Server error", success:false })
    }

}

const deleteProduct= async(req,res)=>{
    const id = req.params.id

    if (!id) {
        return res.status(400).json({success:false, message:"Product Doesn't Exist"})
    }
        try {
            await Product.findByIdAndDelete(id)
            console.log("Product Deleted")
        return res.status(200).json({success: true, message:"Product is deleted Successfully"})

        } catch (error) {
            console.log("Error While deleting a Product",error)
             return res.status(500).json({ message: "Server error" })
        }
}

const getallProduct= async(req,res)=>{

   try {
     const allproduct = await Product.find({})
 
     if (!allproduct) {
         return res.json({message:"No Products"})
     }
    // console.log(allproduct)
     return res.status(200).json({data: allproduct, success : true, message: "List of All Product"})
   } catch (error) {
            console.log("Error While getting all Products",error)
            return res.status(500).json({ message: "Server error" })
   }
}

export{
    addProduct,
    updateProduct,
    deleteProduct,
    getallProduct
}