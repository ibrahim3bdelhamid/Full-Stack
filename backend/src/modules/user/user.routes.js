import { checkEmail } from "../../middleware/checkEmail.js"
import { verifyToken } from "../../middleware/verifyToken.js"
import { getUsers, login, signUp, verifyAccount, updateUser, deleteUser } from "./user.controller.js"
import express from "express"

export const userRoutes = express.Router()

userRoutes.use(express.json())

userRoutes.post("/users/signup", checkEmail, signUp)

userRoutes.post("/users/login", login)

userRoutes.post("/users/verify", verifyAccount)

userRoutes.get("/users", verifyToken, getUsers)

userRoutes.put("/users/:id", verifyToken, updateUser)

userRoutes.delete("/users/:id", verifyToken, deleteUser)