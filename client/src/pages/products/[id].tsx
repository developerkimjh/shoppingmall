import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/products/detail";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { GET_PRODUCT, Product } from "../../graphql/products";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return (
    <div>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
