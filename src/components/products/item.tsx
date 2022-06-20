import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createAt,
}: Product) => (
  <li className="products-item">
    <Link to={`${id}`}>
      <p className="products-item__title">{title}</p>
      <img className="products-item__image" src={imageUrl}></img>
      <span className="products-item__price">${price}</span>
    </Link>
  </li>
);

export default ProductItem;
