import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Product } from "../../graphql/products";
import { cartItemSelector } from "../../recoils/cart";

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createAt,
}: Product) => {
  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
  const addToCart = () => setCartAmount((prev) => (prev || 0) + 1);

  return (
    <li className="products-item">
      <Link to={`${id}`}>
        <p className="products-item__title">{title}</p>
        <img className="products-item__image" src={imageUrl}></img>
        <span className="products-item__price">${price}</span>
      </Link>
      <button className="product-ite__add-cart" onClick={addToCart}>
        담기
      </button>
      <span>{cartAmount || 0}</span>
    </li>
  );
};

export default ProductItem;
