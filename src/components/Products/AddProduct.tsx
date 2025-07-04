import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addProduct } from "./_redux/productSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";

const AddProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productImage, setProductImage] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");

    const handleAddProduct = () => {
        if (!productName || !productPrice || !productImage || !productDescription) {
            alert("Please fill all the fields");
            return;
        }
        const product: Product = {
            id: Date.now().toString(),
            name: productName,
            price: productPrice,
            imageUrl: productImage,
            description: productDescription
        }
        dispatch(addProduct(product));
        navigate("/products");
    }

    return (
        <section id="add-product">
            <div className="container">
                <div className="row my-3">
                    <h2>Add Product</h2>
                    <div className="col-md-6 my-3">
                        <input type="text" className="form-control" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-3">
                        <input type="number" className="form-control" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))} />
                    </div>
                    <div className="col-md-6 my-3">
                        <input type="text" className="form-control" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                    </div>
                    <div className="col-md-6 my-3">
                        <input type="text" className="form-control" placeholder="Product Image" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleAddProduct} className="btn btn-primary">Add Product</button>
            </div>
        </section>
    )
}

export default AddProduct;