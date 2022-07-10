"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_routes_1 = require("./auth.routes");
var user_routes_1 = require("./user.routes");
var category_routes_1 = require("./category.routes");
var note_routes_1 = require("./note.routes");
var router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/category", category_routes_1.default);
router.use("/note", note_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map