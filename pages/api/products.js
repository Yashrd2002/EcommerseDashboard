
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
 await mongooseConnect();
  // await isAdminRequest(req,res);
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query?.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, images, category,properties } = req.body;
    const categor = category || null;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category:categor,
      properties
    });
    res.json(productDoc);
  }
  if (method == "PUT") {
    const { title, description, price, images,category,properties,id } = req.body;
    const categor = category || null;
    await Product.updateOne(
      { _id: id },
      { title, description, price, images, category:categor,properties }
    );
    res.json(true);
  }
  if (method == "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
