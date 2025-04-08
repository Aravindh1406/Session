import { Router } from "express";
import { register, login, dashboard, logout } from "../controllers/userControllers";

const router=Router();
router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", dashboard);
router.post("/logout", logout);
export default router;