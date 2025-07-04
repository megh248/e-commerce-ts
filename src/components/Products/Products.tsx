/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import "./products.scss";
import type { AppDispatch, RootState } from "../../store";
import { getProducts } from "./_redux/productSlice";
import { Link } from "react-router-dom";

// Products page shows all available products
const Products: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);

    // Fetch products when the page loads
    useEffect(() => {
        handleGetProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetProducts = async () => {
        try {
            await dispatch(getProducts());
        } catch (e: any) {
            // In a real app, show a user-friendly error
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <h2 style={{textAlign: 'center', marginTop: '2rem'}}>Loading products, please wait...</h2>;
    }

    return (
        <section id="products">
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-primary" to="/products/add">+ Add a Product</Link>
                    </div>
                    <div className="col-md-12 mt-3">
                        <ProductsList products={products} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;