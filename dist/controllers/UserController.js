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
exports.UserController = void 0;
var User_1 = require("../entities/User");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController(userRepository, userService) {
        var _this = this;
        this.userRepository = userRepository;
        this.userService = userService;
        this.getOneById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        console.log(id);
                        return [4 /*yield*/, this.userService.findOneByIdOrFail(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(400).send({ erroMessage: 'User does not exist' });
                            return [2 /*return*/];
                        }
                        res.status(400).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(500).send({ errorMessage: 'Internal Server Error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.newUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, passEncrypted, newUser, erros, userExist, userSaved, pass, userData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        user = req.body;
                        console.log(user);
                        return [4 /*yield*/, this.userService.encryptPassword(user.pass)];
                    case 1:
                        passEncrypted = _a.sent();
                        newUser = new User_1.User(user.username, passEncrypted, user.photo);
                        return [4 /*yield*/, (0, class_validator_1.validate)(User_1.User)];
                    case 2:
                        erros = _a.sent();
                        if (erros.length > 0) {
                            res.status(400).json(erros);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    username: newUser.username,
                                }
                            })];
                    case 3:
                        userExist = _a.sent();
                        if (userExist) {
                            res.status(400).send({ errorMessage: 'User already exist' });
                            return [2 /*return*/];
                        }
                        console.log("CRIANDO UM NOVO USUÁRIO");
                        return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 4:
                        userSaved = _a.sent();
                        pass = userSaved.pass, userData = __rest(userSaved, ["pass"]);
                        res.status(201).json(userData);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).send({ errorMessage: 'Internal Server Error' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, newPassword, userId;
            var _this = this;
            return __generator(this, function (_b) {
                _a = [
                    req.body,
                    req.body,
                    req.params,
                ], password = _a[0].password, newPassword = _a[1].newPassword, userId = _a[2].userId;
                this.userRepository
                    .findOne({
                    where: {
                        id: userId,
                    },
                })
                    .then(function (userRepo) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!userRepo)
                                    throw new Error("User does not exist");
                                return [4 /*yield*/, this.userService.comparePassword(password, userRepo.pass)];
                            case 1:
                                if (!_b.sent()) return [3 /*break*/, 3];
                                _a = userRepo;
                                return [4 /*yield*/, this.userService.encryptPassword(newPassword)];
                            case 2:
                                _a.pass = _b.sent();
                                this.userRepository
                                    .save(userRepo)
                                    .then(function () {
                                    console.log(">>>>>>>>>>>>>> SENHA ALTERADA >>>>>>>>>>>>>>>>>");
                                    res.status(200).json({ message: "Passaword updated" });
                                })
                                    .catch(function (e) {
                                    console.log("error >>> ".concat(e.message));
                                    res.status(400).json({ error: e.message });
                                });
                                return [3 /*break*/, 4];
                            case 3:
                                res.status(400).json({ error: "Password does not iquals" });
                                _b.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map