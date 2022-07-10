import { Router } from "express";
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import categoryRoutes from './category.routes'
import noteRoutes from './note.routes'

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/note", noteRoutes);

export default router;