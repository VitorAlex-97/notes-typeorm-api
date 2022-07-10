import { Router } from "express";
import { Repository } from "typeorm";
import { UserController } from "../controllers/UserController";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import { UserService } from "../services/user.service";

const router = Router()
const userRepository: Repository<User> = AppDataSource.getRepository(User);
const userService = new UserService(userRepository)
const userController = new UserController(userRepository, userService)

router.post("/new", userController.newUser);
router.patch("/change-password/:userId", userController.changePassword);

export default router;