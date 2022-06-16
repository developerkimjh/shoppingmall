import { Product } from "../../type";

const ProductDetail = ({
  item: {
    category,
    title,
    image,
    description,
    price,
    rating: { rate },
  },
}: {
  item: Product;
}) => (
  <div className="products-detail">
    <p className="products-detail__category">{category}</p>
    <p className="products-detail__title">{title}</p>
    <img className="products-detail__image" src={image}></img>
    <p className="products-detail__description">{description}</p>
    <span className="products-detail__price">${price}</span>
    <span className="products-detail__rating">{rate}</span>
  </div>
);

export default ProductDetail;
