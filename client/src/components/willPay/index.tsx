import { SyntheticEvent } from "react";
import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import ItemData from "../cart/itemData";
import WillPayData from "../cart/willPayData";
import { priceToString } from "../products/item";

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
          <li key={id} className="willpay-product">
            <WillPayData imageUrl={imageUrl} price={price} title={title} />
            <p>
              <label className="willpay-amount">수량:</label>
              <label className="amount-label">{amount}</label>
            </p>
            <p>
              <label className="willpay-price">총 금액:</label>{" "}
              <label className="price-label">
                {priceToString(price * amount)}
              </label>
              원
            </p>
          </li>
        ))}
      </ul>
      <div className="payment">
        <p className="payment-label">
          총 주문금액:{" "}
          <label className="price-label">{priceToString(totalPrice)}</label> 원
        </p>
        <button className="learn-more" onClick={handleSubmit}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">{submitTitle}</span>
        </button>
      </div>
    </div>
  );
};

export default WillPay;
