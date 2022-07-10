import { Router } from "express";
import { Repository } from "typeorm";
import { CategoryController } from "../controllers/CategoryController";
import { AppDataSource } from "../db/dataSource";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { UserService } from "../services/user.service";

const router = Router();


const categoryRepositoy: Repository<Category> = AppDataSource.getRepository(Category);
const userRepository: Repository<User> = AppDataSource.getRepository(User);
const userService = new UserService(userRepository)

const categoryController = new CategoryController(categoryRepositoy, userService);

router.post('/new/:userId', categoryController.createCategory);
router.get('/all/:userId', categoryController.getAllCategories);
router.delete('/delete/:userId', categoryController.deleteCategoryById);
router.patch('/update/:userId', categoryController.updateCategoryLabelByID);

export default router;