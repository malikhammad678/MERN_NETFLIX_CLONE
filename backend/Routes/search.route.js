import express from 'express'
import { searchMovie, searchPerson, searchTv,searchHistory,deleteHistory } from '../controllers/searchController.js';

const searchRoute = express.Router();

searchRoute.get("/person/:query",searchPerson)
searchRoute.get("/movie/:query",searchMovie)
searchRoute.get("/tv/:query",searchTv)
searchRoute.get("/history",searchHistory)
searchRoute.delete("/history/:id",deleteHistory)

export default searchRoute;