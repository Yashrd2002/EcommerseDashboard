import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { LuEdit3 } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);

    });
  }, []);
  return (
    <Layout>
      <div className="flex flex-col">
        <div>
          <Link
            href={"/products/new"}
            className="flex items-center gap-2 p-2 border-2 bg-[#4763E4] w-fit text-white text-xl rounded-xl px-5"
          >
            Add Product <AiOutlinePlusSquare />
          </Link>
        </div>


          <table className=" w-8/12 text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="py-4">
                  Product Name
                </th>
                <th scope="col" className="py-4">
                  Price(in Rs)
                </th>
                <th scope="col" className="py-4"></th>
              </tr>
            </thead>
            {products.map((p) => (
              <tbody key={p._id}>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap py-4">{p.title}</td>
                  <td className="whitespace-nowrap py-4">{p.price}</td>
                  <td className="whitespace-nowrap py-4 flex gap-3">
                    <Link href={`/products/edit/${p._id}`} className="border-2 flex p-1 w-20 border-[#5C73DB] rounded-lg items-center justify-center px-3 gap-2">
                      <LuEdit3 /><p>Edit</p>
                    </Link>
                    <Link
                      href={`/products/delete/${p._id}`}
                      className="text-white  flex p-1 w-20 bg-red-500 rounded-lg items-center justify-center px-3 gap-2"
                    >
                      <RiDeleteBin6Line />Delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

    </Layout>
  );
};

export default Products;
