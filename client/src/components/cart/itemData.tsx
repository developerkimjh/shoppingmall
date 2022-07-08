import { CartType } from "../../graphql/cart";


//장바구니 세부내역(이미지, 가격, 이름)
const ItemData = ({
  imageUrl,
  price,
  title,
}: Pick<CartType, "imageUrl" | "price" | "title">) => (
  <>
    <img className="cart-item__image" src={imageUrl} />
    <p className="cart-item__price">{price}</p>
    <p className="cart-item__title">{title}</p>
  </>
);

export default ItemData;
