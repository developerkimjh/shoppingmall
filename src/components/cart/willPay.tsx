import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import ItemData from "./itemData";

const WillPay = () => {
  const navigate = useNavigate();
  const checkeditems = useRecoilValue(checkedCartState);
  const totalPrice = checkeditems.reduce((res, { amount, price }) => {
    res += amount * price;
    return res;
  }, 0);

  const handleSubmit = () => {
    if (checkeditems.length) {
      navigate("/payment");
    } else {
      alert("장바구니가 비었어요");
    }
  };

  return (
    <div className="cart-willpay">
      <ul>
        {checkeditems.map(({ imageUrl, price, title, id, amount }) => (
          <li>
            <ItemData
              imageUrl={imageUrl}
              price={price}
              title={title}
              key={id}
            />
            <p>수량: {amount}</p>
            <p>금액: {price * amount}</p>
          </li>
        ))}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>결제하기</button>
    </div>
  );
};

export default WillPay;
