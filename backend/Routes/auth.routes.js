import express from 'express'
import { login, logout, signup,authCheck } from '../controllers/authController.js'
import { protectedRoute } from '../protectRoute/protectedRoute.js'

const authRoute = express.Router()

authRoute.post("/signup",signup)
authRoute.post("/login",login)
authRoute.post("/logout",logout)
authRoute.get("/checkAuth",protectedRoute,authCheck);

export default authRoute