import { ForwardedRef, forwardRef, SyntheticEvent } from "react";
import { useMutation } from "react-query";
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import ItemData from "./itemData";

//장바구니 기능 및 내역(전체선택, 장바구니 물품)
const CartItem = (
  { id, imageUrl, price, title, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);

        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(
          QueryKeys.CART
        );

        if (!prevCart?.[id]) return prevCart;

        const newCart = {
          ...(prevCart || {}),
          [id]: { ...prevCart[id], amount },
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);

        return prevCart;
      },
      onSuccess: (newValue) => {
        const prevCart = queryClient.getQueryData(QueryKeys.CART);
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });
  };

  return (
    <li className="cart-item">
      <label className="small-container">
        <input
          className="cart-item__checkbox"
          type="checkbox"
          name="select-item"
          ref={ref}
          data-id={id}
        />
        <div className="checkmark"></div>
      </label>
      <ItemData imageUrl={imageUrl} price={price} title={title} />
      <div className="cart-update">
        <label className="amount-label">수량 : </label>
        <input
          className="cart-item__amount"
          type="number"
          value={amount}
          min={1}
          onChange={handleUpdateAmount}
        />
        <button
          className="cart-item__button"
          type="button"
          onClick={handleDeleteItem}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default forwardRef(CartItem);
