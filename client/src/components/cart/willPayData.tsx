import { CartType } from "../../graphql/cart";
import { priceToString } from "../products/item";

//장바구니 세부내역(이미지, 가격, 이름)
const WillPayData = ({
  imageUrl,
  price,
  title,
}: Pick<CartType, "imageUrl" | "price" | "title">) => (
  <div>
    <img className="willpay-item__image" src={imageUrl} />
    <p className="willpay-item__title">{title}</p>
    <p className="willpay-item__price">
      <label className="price-label">{priceToString(price)}</label>원
    </p>
  </div>
);

export default WillPayData;
