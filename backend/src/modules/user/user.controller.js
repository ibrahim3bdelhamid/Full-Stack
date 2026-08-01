import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailConfirmation } from "../../middleware/mailConfirmation.js"


export const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ msg: "Users retrieved successfully", users });
};

export async function signUp(req, res){
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

    req.body.password = bcrypt.hashSync(req.body.password, 8)
    req.body.verificationCode = verificationCode
    await userModel.insertMany(req.body)

    mailConfirmation(req.body.email, verificationCode).catch(err => console.error("Email failed:", err))

    res.json({message:"User registered successfully"})
}

export const verifyAccount = async (req, res) => {
  const { email, code } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    res.json({ msg: "User not found" });
  } else if (user.verificationCode === code) {
    await userModel.updateOne({ email }, { isVerified: true });
    res.json({ msg: "Account verified successfully" });
  } else {
    res.json({ msg: "Invalid verification code" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.json({ msg: "Invalid email or password" });
  }
  if (!user.isVerified) {
    return res.json({ msg: "Please verify your account first" });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, "nti", { expiresIn: "7d" });
  const { password: _pw, ...userWithoutPassword } = user.toObject();
  res.json({ msg: "Login successful", token, user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    res.json({ msg: "User not found" });
  } else {
    res.json({ msg: "User updated successfully", user });
  }
};

export const deleteUser = async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);

  if (!user) {
    res.json({ msg: "User not found" });
  } else {
    res.json({ msg: "User deleted successfully" });
  }
};