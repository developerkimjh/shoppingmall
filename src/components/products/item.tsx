import { Product } from "../../type";

const ProductItem = ({ category, image, price, rating, title }: Product) => (
  <li className="products-item">
    <p className="products-item__category">{category}</p>
    <p className="products-item__title">{title}</p>
    <img className="products-item__image" src={image}></img>
    <span className="products-item__price">${price}</span>
    <span className="products-item__rating">{rating.rate}</span>
  </li>
);

export default ProductItem;
