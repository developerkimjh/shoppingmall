import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";

const Gnb = () => {
  return (
    <div>
      <nav className="gnb">
        <div className="gnbleft">
          <img className="logo" src={logo} />
        </div>
        <ul className="gnbcenter">
          <li>
            <Link to="/" className="a">
              홈
            </Link>
          </li>
          <li>
            <Link to="/products" className="a">
              상품목록
            </Link>
          </li>
          <li>
            <Link to="/cart" className="a">
              장바구니
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Gnb;
