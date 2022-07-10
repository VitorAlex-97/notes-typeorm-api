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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
var Note_1 = require("../entities/Note");
var moment = require("moment");
var NoteController = /** @class */ (function () {
    function NoteController(noteRepository, userRepository, categoruRepository, commons) {
        var _this = this;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.categoruRepository = categoruRepository;
        this.commons = commons;
        this.createNotes = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, title, body, userId, categoryId;
            var _this = this;
            return __generator(this, function (_c) {
                _a = [
                    request.body,
                    request.params,
                    request.query
                ], _b = _a[0], title = _b.title, body = _b.body, userId = _a[1].userId, categoryId = _a[2].categoryId;
                if (!(title && body)) {
                    response.status(400).json({ error: 'Title & body are required' });
                    return [2 /*return*/];
                }
                this.userRepository.findOne({
                    where: {
                        id: userId
                    }
                }).then(function (userRepo) {
                    if (!userRepo)
                        throw new Error('User does not exist');
                    var user = userRepo;
                    _this.categoruRepository.findOne({
                        where: {
                            id: +categoryId
                        }
                    }).then(function (categoryRepo) {
                        if (!categoryRepo)
                            throw new Error('Category does not exist');
                        var category = categoryRepo;
                        var newNote = new Note_1.Note(title, body, category, user);
                        _this.noteRepository.save(newNote).then(function () {
                            response.status(201).json({ message: 'Note created' });
                        }).catch(function (e) {
                            console.log("error >>> ".concat(e.message));
                            response.status(400).json({ error: e.message });
                        });
                    }).catch(function (e) {
                        console.log("error >>> ".concat(e.message));
                        response.status(400).json({ error: e.message });
                    });
                }).catch(function (e) {
                    console.log("error >>> ".concat(e.message));
                    response.status(400).json({ error: e.message });
                });
                return [2 /*return*/];
            });
        }); };
        this.updateNote = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, title, body, userId, _c, categoryId, noteId, noteRepo, currentDate, result, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = [
                            request.body,
                            request.params,
                            request.query
                        ], _b = _a[0], title = _b.title, body = _b.body, userId = _a[1].userId, _c = _a[2], categoryId = _c.categoryId, noteId = _c.noteId;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.commons.userExist(userId)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.commons.categoryExist(+categoryId)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, this.commons.noteExist(+noteId)];
                    case 4:
                        noteRepo = _d.sent();
                        currentDate = moment();
                        noteRepo.title = title;
                        noteRepo.body = body;
                        noteRepo.editedAt = currentDate.toDate();
                        return [4 /*yield*/, this.noteRepository.update(+noteId, noteRepo)];
                    case 5:
                        result = _d.sent();
                        console.log(result);
                        response.status(200).json({ message: 'deu certo' });
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _d.sent();
                        response.status(400).json({ error: err_1.message });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getNoteByCategory = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
    }
    return NoteController;
}());
exports.NoteController = NoteController;
//# sourceMappingURL=NoteController.js.map