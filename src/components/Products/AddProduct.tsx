import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addProduct } from "./_redux/productSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";

// AddProduct lets users add a new product to the store
const AddProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // Form state
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState<number | "">("");
    const [productImage, setProductImage] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [error, setError] = useState("");

    // Handle form submission
    const handleAddProduct = () => {
        if (!productName || !productPrice || !productImage || !productDescription) {
            setError("Please fill in all the fields before adding your product.");
            return;
        }
        setError("");
        const newProduct: Product = {
            id: Date.now().toString(),
            name: productName,
            price: Number(productPrice),
            imageUrl: productImage,
            description: productDescription
        };
        dispatch(addProduct(newProduct));
        navigate("/products");
    };

    return (
        <section id="add-product">
            <div className="container-fluid">
                <div className="row my-3">
                    <h2>Add a New Product</h2>
                    <div className="col-md-6 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Cozy Blanket"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 my-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Price in USD (e.g. 29.99)"
                            value={productPrice}
                            onChange={e => setProductPrice(e.target.value ? parseFloat(e.target.value) : "")}
                        />
                    </div>
                    <div className="col-md-6 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="A short description"
                            value={productDescription}
                            onChange={e => setProductDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Image URL (e.g. https://...)"
                            value={productImage}
                            onChange={e => setProductImage(e.target.value)}
                        />
                    </div>
                </div>
                {error && <div className="alert alert-warning" role="alert">{error}</div>}
                <button onClick={handleAddProduct} className="btn btn-primary">
                    Add Product
                </button>
            </div>
        </section>
    );
}

export default AddProduct;