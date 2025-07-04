/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import "./products.scss";
import type { AppDispatch, RootState } from "../../store";
import { getProducts } from "./_redux/productSlice";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    useEffect(() => {
        handleGetProducts();
    }, []);
    const handleGetProducts = async () => {
        try {
            await dispatch(getProducts());
        } catch (e: any) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <section id="products">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <Link className="btn btn-primary" to="/products/add">Add Product</Link>
                    </div>
                    <div className="col-md-12 mt-3">
                        <ProductsList products={products} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;