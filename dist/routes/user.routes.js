"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var dataSource_1 = require("../db/dataSource");
var User_1 = require("../entities/User");
var user_service_1 = require("../services/user.service");
var router = (0, express_1.Router)();
var userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
var userService = new user_service_1.UserService(userRepository);
var userController = new UserController_1.UserController(userRepository, userService);
router.get("/getOneById/:id", userController.getOneById);
router.post("/new", userController.newUser);
router.patch("/change-password/:userId", userController.changePassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map