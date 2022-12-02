import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { data } from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import { useContext } from "react";

function ProductPage() {
  const { query } = useRouter();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const product = data.products.find((x) => x["slug"] == query.slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  function addCartHandler() {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    let payload = { ...product, quantity };

    //successful execution - no logical error in dispatch
    dispatch({
      type: "CART_ADD_ITEM",
      payload: payload,
    });

    router.push("/cart");
  }

  return (
    <div>
      <Layout title={product.name}>
        <Link href="/">Back to products</Link>
        <div className="grid md:grid-cols-4 md:gap-3 ">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>{product.category}</li>
              <li>Brand : {product.brank}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>

              <li>{product.description}</li>
            </ul>
          </div>
          <div className="card p-5 h-36">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={addCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
        <Link href="/cart">Cart page</Link>
      </Layout>
    </div>
  );
}

export default ProductPage;
