import express from 'express'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.routes.js';
import { connectToDb } from './config/db.js';
import movieRoute from './Routes/movie.route.js';
import tvRouter from './Routes/tv.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { protectedRoute } from './protectRoute/protectedRoute.js';
import searchRoute from './Routes/search.route.js';

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());



dotenv.config();
const Port = process.env.PORT || 5000

app.use("/api/v1/auth" ,authRoute);
app.use("/api/v1/movie", protectedRoute ,movieRoute)
app.use("/api/v1/tv", protectedRoute,tvRouter);
app.use("/api/v1/search",protectedRoute,searchRoute);


app.listen(Port, () => {
    console.log(`Server is running on port: ${Port}`);
    connectToDb();
})
