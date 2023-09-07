import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("shoul be post");
    return;
  }
  const { name, email, city, postalCode, address, country,cartProducts } = req.body;

  await mongooseConnect();
  const ids = cartProducts;
  const uniqueids = [...new Set(ids)];

  const info = await Product.find({_id:uniqueids});

  let line_items = [];
  for (const productId of uniqueids) {
    const productInfo = info.find(p => p._id.toString() === productId);
    const quantity = ids.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'inr',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }


  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    address,country,paid:false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  });

  res.json({
    url:session.url,
  })

}
