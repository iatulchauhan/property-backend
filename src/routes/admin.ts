"use strict";
import { Router } from "express";
import { uploadJWT, userJWT } from "../helper";
import * as validation from "../validation";
import { adminController } from "../controller";

const router = Router();

//admin Auth route
router.post("/signup", validation?.adminSignup, adminController.adminSignUp);
router.post("/login", validation?.adminLogin, adminController.adminLogin);

router.use(uploadJWT)

// update profile
router.put("/updateProfile", validation?.updateProfile, adminController.updateProfile);
// active inActive
router.put("/activeInactiveUser", validation?.activeInactive, adminController.activeInactive);
// get profile
router.get("/getProfile/:id", adminController.getProfile);



// product route
router.post("/addProduct", validation?.addProduct, adminController.addProduct);
router.get("/getProduct/:id", adminController.getProductById);
router.put("/updateProduct", validation?.updateProduct, adminController.updateProduct);
router.delete("/deleteProduct/:id", adminController.deleteProduct);
router.get("/allProduct", adminController.allProducts);


// blog route  
router.post("/addBlog", validation?.addBlog, adminController.addBlog);
router.get("/getBlog/:id", adminController.getBlogById);
router.put("/updateBlog", validation?.updateBlog, adminController.updateBlog);
router.delete("/deleteBlog/:id", adminController.deleteBlog);
router.get("/allBlog", adminController.allBlogs);


// dashboard
router.get("/dashboard", adminController.dashboard);

export const adminRouter = router;
