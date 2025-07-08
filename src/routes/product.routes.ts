import { Router } from "express";
import { addProduct, getProduct, updateProduct } from "../controllers/product.controller";


const router = Router();

router.get("/", getProduct);
router.post("/add", addProduct);
router.put("/update/:id", updateProduct);

export default router;
