"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Commons_1 = require("../commons/Commons");
var NoteController_1 = require("../controllers/NoteController");
var dataSource_1 = require("../db/dataSource");
var Category_1 = require("../entities/Category");
var Note_1 = require("../entities/Note");
var User_1 = require("../entities/User");
var router = (0, express_1.Router)();
var userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
var noteRepository = dataSource_1.AppDataSource.getRepository(Note_1.Note);
var categoryRepository = dataSource_1.AppDataSource.getRepository(Category_1.Category);
var UserCommon = new Commons_1.Commons(userRepository, categoryRepository, noteRepository);
var noteController = new NoteController_1.NoteController(noteRepository, userRepository, categoryRepository, UserCommon);
router.post('/new/:userId', noteController.createNotes);
router.patch('/update/:userId', noteController.updateNote);
exports.default = router;
//# sourceMappingURL=note.routes.js.map