import express from 'express'
import { getMovieDetail, getMovieTrailers, getTrendingMovie, similarMovie, movieCategory } from '../controllers/movie.controller.js';

const movieRoute = express.Router();
movieRoute.get("/trending",getTrendingMovie);
movieRoute.get("/:id/trailers",getMovieTrailers)
movieRoute.get("/:id/details",getMovieDetail);
movieRoute.get("/:id/similar",similarMovie);
movieRoute.get("/:category",movieCategory);

export default movieRoute;