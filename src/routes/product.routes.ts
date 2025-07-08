import { Router } from "express";
import { addProduct, getProduct } from "../controllers/product.controller";

const router = Router();

router.get("/", getProduct);
router.post("/add", addProduct);

export default router;
