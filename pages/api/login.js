import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import Admin from "@models/Admin";

dbConnect();

export default async function login(req, res) {
  const { method } = req;

  if (!req.body.username || !req.body.password || !req.body.role) {
    return res.json({ error: "Please fill out the fields" });
  }

  switch (method) {
    case "POST":
      try {
        if (req.body.role === 2) {
          const admin = await Admin.findOne({ username: req.body.username });
          if (!admin) {
            return res.json({ error: "Admin not found" });
          }
          const isMatch = await compare(req.body.password, admin.password);
          if (!isMatch) {
            return res.json({ error: "Password mismatch" });
          }
          const token = await jwt.sign(
            {
              username: req.body.username,
              password: req.body.password,
              role: req.body.role,
            },
            process.env.JWT_SECRET
          );
          return res.json({ data: { token } });
        } else {
          return res.json({ error: "Belum ada data" });
        }
      } catch (e) {
        return res.json({ error: "Error happen" });
      }
      break;
  }
  res.status(200).json({ error: "Error happen" });
}
