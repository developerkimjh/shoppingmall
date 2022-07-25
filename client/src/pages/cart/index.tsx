import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CartList from "../../components/cart";
import { CartType, GET_CART } from "../../graphql/cart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  });

  const nevigate = useNavigate();

  const handleSubmit = () => {
    let path = "/products";
    nevigate(path);
  };

  const cartItems = Object.values(data || {}) as CartType[];

  if (!cartItems.length)
    return (
      <div className="empty-cart">
        <label>장바구니에 담은 상품이 없습니다.</label>
        <div className="payment">
          <button className="learn-more" onClick={handleSubmit}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">상품보기</span>
          </button>
        </div>
      </div>
    );

  return <CartList items={cartItems} />;
};

export default Cart;
function nevigate(arg0: string) {
  throw new Error("Function not implemented.");
}
