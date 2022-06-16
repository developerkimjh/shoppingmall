import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ProductDetail from "../../components/products/detail";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../type";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: "GET",
      path: "/products/" + id,
    })
  );

  if (!data) return <h2>상품상세</h2>;

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
