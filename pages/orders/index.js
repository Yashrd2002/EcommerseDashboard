import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setorders(res.data);
    });
  });
  return (
    <Layout>
      <div>Orders</div>
      <div>
        {orders.map((o) => (
          <div className="flex gap-4" key={o._id}>
            <div>{(new Date(o.createdAt)).toLocaleString()}</div>
            <div>{o.name}</div>
            <div>{o.email}</div>
            <div>{o.postalCode}</div>
            <div>{o.country}</div>
            <div>{o.address}</div>
            <div className="border-2">
              {o.line_items.map((l) => (
                <div className="flex gap-4">
                  <div>{l.quantity}</div>
                  <div>{l.price_data.currency}</div>
                  <div>{l.price_data.currency.name}</div>
                  <div>{l.price_data.unit_amount}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
