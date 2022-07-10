"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CategoryController_1 = require("../controllers/CategoryController");
var dataSource_1 = require("../db/dataSource");
var Category_1 = require("../entities/Category");
var User_1 = require("../entities/User");
var user_service_1 = require("../services/user.service");
var router = (0, express_1.Router)();
var categoryRepositoy = dataSource_1.AppDataSource.getRepository(Category_1.Category);
var userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
var userService = new user_service_1.UserService(userRepository);
var categoryController = new CategoryController_1.CategoryController(categoryRepositoy, userService);
router.post('/new/:userId', categoryController.createCategory);
router.get('/all/:userId', categoryController.getAllCategories);
router.delete('/delete/:userId', categoryController.deleteCategoryById);
router.patch('/update/:userId', categoryController.updateCategoryLabelByID);
exports.default = router;
//# sourceMappingURL=category.routes.js.map