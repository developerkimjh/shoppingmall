import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { ADD_CART } from "../../graphql/cart";
import { Product } from "../../graphql/products";
import { graphqlFetcher } from "../../queryClient";

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
  return (
    <li className="product-item">
      <Link to={`${id}`}>
        <p className="products-item__title">{title}</p>
        <img className="products-item__image" src={imageUrl}></img>
        <span className="products-item__price">${price}</span>
      </Link>
      <button className="product-ite__add-cart" onClick={() => addCart(id)}>
        담기
      </button>
    </li>
  );
};

export default ProductItem;
