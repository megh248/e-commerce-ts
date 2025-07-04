import { Product } from "../../../types/Product";
import ProductsListItem from "./ProductsListItem/ProductsListItem";

// ProductsList renders a grid of product cards
const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
    if (!products.length) {
        return <div style={{textAlign: 'center', marginTop: '2rem', color: '#888'}}>No products found. Why not add one?</div>;
    }
    return (
        <div className="row">
            {products.map((product) => (
                <ProductsListItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;