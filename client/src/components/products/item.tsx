import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { graphqlFetcher } from "../../queryClient";
import cart from "../../img/cart.png";

//상품목록 메인 페이지
const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  );
  const cartClick = () => {
    addCart(id);
    alert(`장바구니에 ${title} 상품이 담겼습니다.`);
  };

  return (
    <li className="product-item">
      <Link to={`${id}`}>
        <img className="products-item__image" src={imageUrl}></img>

        <p className="products-item__title">{title}</p>
        <span className="products-item__price">
          <label className="price-label">{priceToString(price)}</label>원
        </span>
      </Link>
      <img src={cart} className="product-ite__add-cart" onClick={cartClick} />
    </li>
  );
};

export const priceToString = (price: { toString: () => string }) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default ProductItem;
