import express from "express";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import { create, update, remove, list, read, productsByCategory } from "../controllers/category.js";


// CRUD operations
router.post("/category", requireSignin, isAdmin, create);  // create
router.put("/category/:categoryId", requireSignin, isAdmin, update);   // update
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);  // delete
router.get("/categories", list);  // read
router.get("/category/:slug", read); // read a single category
router.get("/products-by-category/:slug", productsByCategory); 
export default router;