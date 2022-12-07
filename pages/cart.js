import React from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [num, setNum] = useState();
  console.log("cartItems :", state.cart.cartItems);
  const deleteCartItem = (item) => {
    dispatch({
      type: "DELETE_CART_ITEM",
      payload: item,
    });
  };

  const updateHandler = (item, count) => {
    console.log("update handler ran");
    const q = Number(count);
    console.log("q : ", q);
    let payload = { ...item, quantity: q };
    dispatch({
      type: "CART_ADD_ITEM",
      payload: payload,
    });
  };

  return (
    <Layout title="shopping cart">
      <h1 className="mb-4 text-xl">shopping cart</h1>
      {state.cart.cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-left">Quantity</th>
                  <th className="px-5 text-left">Price</th>
                  <th className="px-5 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.cartItems.map((item) => {
                  return (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link legacyBehavior href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 ">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateHandler(item, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 ">${item.price}</td>
                      <td className="p-5 ">
                        <button onClick={() => deleteCartItem(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-5 h-32">
            <ul>
              <li>
                <div className="pb-3">
                  Subtotal (
                  {state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  {state.cart.cartItems.reduce(
                    (a, c) => a + c.quantity * c.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  className="primary-button"
                  onClick={() => router.push("/shipping")}
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
