import { Product } from "../../graphql/products";

//상품목록 세부정보 페이지
const ProductDetail = ({
  item: { title, imageUrl, description, price },
}: {
  item: Product;
}) => (
  <div className="products-detail">
    <p className="products-detail__title">{title}</p>
    <img className="products-detail__image" src={imageUrl}></img>
    <p className="products-detail__description">{description}</p>
    <span className="products-detail__price">${price}</span>
  </div>
);

export default ProductDetail;
