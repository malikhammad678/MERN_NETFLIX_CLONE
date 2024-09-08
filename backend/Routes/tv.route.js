import express from 'express'
import { gettvDetail, gettvMovie, gettvTrailers, similartv, tvCategory } from '../controllers/tv.controller.js';

const tvRouter = express.Router();

tvRouter.get("/trending",gettvMovie);
tvRouter.get("/:id/trailers",gettvTrailers)
tvRouter.get("/:id/details",gettvDetail);
tvRouter.get("/:id/similar",similartv);
tvRouter.get("/:category",tvCategory);

export default tvRouter;