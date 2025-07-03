import { Product } from "../../../types/Product";
import ProductsListItem from "./ProductsListItem/ProductsListItem";

const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <ProductsListItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductsList;