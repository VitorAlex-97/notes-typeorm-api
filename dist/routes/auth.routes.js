"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var router = (0, express_1.Router)();
router.post("/login", AuthController_1.AuthController.login);
router.post("/change-password", AuthController_1.AuthController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map