import { Link } from "react-router-dom";
import logo from "../../img/logo.jpg";

const Gnb = () => {
  let marker = document.querySelector<HTMLElement>(".marker");
  let item = document.querySelectorAll<HTMLElement>(".menu");

  console.log("dd");

  const indicator = (e: any) => {
    marker!.style.left = e.offsetLeft + "px";
    marker!.style.width = e.offsetWidth + "px";
  };

  item.forEach((link) => {
    link.addEventListener("click", (e) => {
      indicator(e.target);
    });
  });

  return (
    <div>
      <nav className="gnb">
        <div className="gnbleft">
          <a href="/">
            <img className="logo" src={logo} />
          </a>
        </div>
        <div className="marker"></div>
        <ul className="gnbcenter">
          <li>
            <Link to="/" className="menu">
              홈
            </Link>
          </li>
          <li>
            <Link to="/products" className="menu">
              상품목록
            </Link>
          </li>
          <li>
            <Link to="/cart" className="menu">
              장바구니
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Gnb;
