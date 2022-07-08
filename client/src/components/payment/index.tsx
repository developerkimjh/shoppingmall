import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import WillPay from "../../components/willPay";
import { EXECUTE_PAY } from "../../graphql/payment";
import { graphqlFetcher } from "../../queryClient";
import { checkedCartState } from "../../recoils/cart";
import PaymentModal from "./modal";

type PaymentInfos = string[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckCartData] = useRecoilState(checkedCartState);
  const [ModalShow, toggleModal] = useState(false);
  const { mutate: excutePay } = useMutation((payInfos: PaymentInfos) =>
    graphqlFetcher(EXECUTE_PAY, payInfos)
  );

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id }) => id);
    excutePay(payInfos);
    setCheckCartData([]);
    alert("결제가 완료되었습니다");
    navigate("/products", { replace: true });
  };

  const cancle = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay handleSubmit={showModal} submitTitle="결제하기" />
      <PaymentModal show={ModalShow} proceed={proceed} cancel={cancle} />
    </div>
  );
};

export default Payment;
