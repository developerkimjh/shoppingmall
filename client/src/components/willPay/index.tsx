import { SyntheticEvent } from "react";
import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import ItemData from "../cart/itemData";

const WillPay = ({
  handleSubmit,
  submitTitle,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const checkeditems = useRecoilValue(checkedCartState);
  const totalPrice = checkeditems.reduce((res, { amount, price }) => {
    res += amount * price;
    return res;
  }, 0);

  return (
    <div className="cart-willpay">
      <ul>
        {checkeditems.map(({ imageUrl, price, title, id, amount }) => (
          <li key={id}>
            <ItemData imageUrl={imageUrl} price={price} title={title} />
            <p>수량: {amount}</p>
            <p>금액: {price * amount}</p>
          </li>
        ))}
      </ul>
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
