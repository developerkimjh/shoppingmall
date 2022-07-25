import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CartType } from "../../graphql/cart";
import { checkedCartState } from "../../recoils/cart";
import CartItem from "./item";
import WillPay from "../willPay";
import { useNavigate } from "react-router-dom";

//장바구니 페이지 메인화면
const CartList = ({ items }: { items: CartType[] }) => {
  const nevigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  const setAllCheckedFormItmes = () => {
    //개별아이템 선택시
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    const allChecked = selectedCount == items.length;
    formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
      allChecked;
  };

  const setitemsCheckedFormAll = (targetInput: HTMLInputElement) => {
    //select-all 선택
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;

    if (targetInput && targetInput.classList.contains("select-all")) {
      setitemsCheckedFormAll(targetInput);
    } else {
      setAllCheckedFormItmes();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      nevigate("/payment");
    } else {
      alert("장바구니가 비었어요");
      event?.preventDefault();
    }
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find(
        (ref) => ref.current!.dataset.id === item.id
      );
      if (itemRef) itemRef.current!.checked = true;
    });
    setAllCheckedFormItmes();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <form ref={formRef} onChange={handleCheckboxChanged} className="cartform">
      <div className="check-box">
        <label className="big-container">
          <input className="select-all" name="select-all" type="checkbox" />
          <div className="checkmark"></div>
        </label>
        <p className="check-all">전체선택</p>
      </div>
      <ul className="cart">
        {items.map((item, i) => (
          <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
        ))}
      </ul>
      <WillPay handleSubmit={handleSubmit} submitTitle="결제창으로" />
    </form>
  );
};

export default CartList;
