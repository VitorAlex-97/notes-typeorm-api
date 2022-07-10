"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
var Category_1 = require("../entities/Category");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryRepository, userService) {
        var _this = this;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
        this.createCategory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, label, newCategory, userRepo, category, user, categoryData, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = [req.params, req.body], userId = _a[0].userId, label = _a[1].label;
                        if (!label)
                            throw new Error('Label is required');
                        newCategory = new Category_1.Category(label);
                        return [4 /*yield*/, this.userService.findOneByIdOrFail(userId)];
                    case 1:
                        userRepo = _b.sent();
                        newCategory.user = userRepo;
                        return [4 /*yield*/, this.categoryRepository.save(newCategory)];
                    case 2:
                        category = _b.sent();
                        user = category.user, categoryData = __rest(category, ["user"]);
                        res.status(201).json(categoryData);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(400).json({ error: err_1.message }).end();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCategories = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return __generator(this, function (_a) {
                userId = req.params.userId;
                this.userService.findOneByIdOrFail(userId).then(function (userRepo) {
                    _this.categoryRepository.find({
                        where: {
                            user: {
                                id: userId
                            }
                        }
                    }).then(function (categoriesRepo) {
                        res.status(200).json(categoriesRepo);
                    })
                        .catch(function (e) {
                        console.log("error >> ".concat(e.message));
                        res.status(200).json({ error: e.message }).end();
                    });
                }).catch(function (e) {
                    console.log("error >> ".concat(e.message));
                    res.status(400).json({ error: e.message }).end();
                });
                return [2 /*return*/];
            });
        }); };
        this.updateCategoryLabelByID = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, category, label;
            var _this = this;
            return __generator(this, function (_b) {
                _a = [req.params, req.query, req.body], userId = _a[0].userId, category = _a[1].category, label = _a[2].label;
                if (!label) {
                    return [2 /*return*/, res.status(400).json({ error: "Label is required" }).end()];
                }
                this.userService.findOneByIdOrFail(userId).then(function (userRepo) {
                    _this.categoryRepository.findOne({
                        where: {
                            id: +category
                        }
                    }).then(function (categoryRepo) {
                        if (!categoryRepo)
                            throw new Error("Category does not exist");
                        categoryRepo.label = label;
                        _this.categoryRepository.save(categoryRepo);
                        res.status(200).json({ message: "Label was updated" });
                    }).catch(function (e) {
                        console.log("error >>> ".concat(e.message));
                        res.status(404).json({ error: e.message });
                    });
                }).catch(function (e) {
                    console.log("error >>> ".concat(e.message));
                    res.status(400).json({ error: e.message });
                });
                return [2 /*return*/];
            });
        }); };
        this.deleteCategoryById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, category;
            var _this = this;
            return __generator(this, function (_b) {
                _a = [req.params, req.query], userId = _a[0].userId, category = _a[1].category;
                this.userService.findOneByIdOrFail(userId).then(function (userRepo) {
                    _this.categoryRepository.delete({ id: +category }).then(function (result) {
                        console.log('>>>>>>>> User Category deleted >>>>>>>>>>');
                        if (result.affected > 0)
                            res.status(200).json({ message: "Category deleted" });
                        else
                            throw new Error("Category does not exists");
                    }).catch(function (e) {
                        console.log("error >>> ".concat(e.message));
                        res.status(400).json({ error: e.message });
                    });
                }).catch(function (e) {
                    console.log("error >>> ".concat(e.message));
                    res.status(400).json({ error: e.message });
                });
                return [2 /*return*/];
            });
        }); };
    }
    return CategoryController;
}());
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map