import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === "GET") {
    res.json(await Category.find().populate("parentcategory"));
  }

  if (method === "POST") {
    const { name, parentcategory, properties } = req.body;
    let CategoryDoc;
    if(parentcategory){
      CategoryDoc= await Category.create({
        name,
        parentcategory,
        properties
      });
    }else{
      CategoryDoc = await Category.create({
        name,
        properties
      });
    }
    
    res.json(CategoryDoc);
  }
  if (method === "PUT") {
    const { name, parentcategory, properties, _id } = req.body;
    const CategoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parentcategory,
        properties,
      }
    );
    res.json(CategoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
