
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name, email, password } = await req.body;
    const role="User";
    const existuser = await User.findOne({ email }).select("_id");
    if (existuser) {
      res.status(409).json({message:"User already exists"});

    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const UserDoc = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });
      res.json(UserDoc);
    }
  }
}
