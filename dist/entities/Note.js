"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var User_1 = require("./User");
var Note = /** @class */ (function () {
    function Note(title, body, category, user) {
        this.title = title;
        this.body = body;
        this.category = category;
        this.user = user;
    }
    Note_1 = Note;
    var Note_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
        __metadata("design:type", Number)
    ], Note.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        (0, class_validator_1.Length)(3, 40),
        __metadata("design:type", String)
    ], Note.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        (0, class_validator_1.Length)(3, 300),
        __metadata("design:type", String)
    ], Note.prototype, "body", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Note.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)('date', { nullable: true, default: null }),
        __metadata("design:type", Date)
    ], Note.prototype, "editedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", User_1.User)
    ], Note.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Category_1.Category; }, function (note) { return Note_1; }, { eager: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Category_1.Category)
    ], Note.prototype, "category", void 0);
    Note = Note_1 = __decorate([
        (0, typeorm_1.Entity)("tb_notes"),
        __metadata("design:paramtypes", [String, String, Category_1.Category, User_1.User])
    ], Note);
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=Note.js.map