import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductsList from "./ProductsList/ProductsList";
import { fetchProducts } from "./_redux/productActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store"; // adjust path as needed

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        handleGetProducts();
    },[]);
    const handleGetProducts = async () => {
        try{
            const resp = await dispatch(fetchProducts());
            if (resp && resp.payload) {
                setProducts(resp.payload as Product[]);
            }
        }catch(e:any){
            console.log(e);
        }
        finally{
            setIsLoading(false);
        }
    }
    if(isLoading){
        return <h1>Loading...</h1>
    }
    return (
        <section id="products">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ProductsList products={products} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;