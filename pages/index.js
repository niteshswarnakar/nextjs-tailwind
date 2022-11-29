import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import { data } from "../utils/data";

export default function Home() {
  return (
    <Layout title="homepage">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product, index) => {
          return <ProductItem key={index} product={product} />;
        })}
      </div>
    </Layout>
  );
}
