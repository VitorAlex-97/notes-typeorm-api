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
exports.Category = void 0;
var typeorm_1 = require("typeorm");
var Note_1 = require("./Note");
var User_1 = require("./User");
var Category = /** @class */ (function () {
    function Category(label) {
        this.label = label;
    }
    Category_1 = Category;
    var Category_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: false }),
        __metadata("design:type", String)
    ], Category.prototype, "label", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", User_1.User)
    ], Category.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Note_1.Note; }, function (category) { return Category_1; }),
        __metadata("design:type", Array)
    ], Category.prototype, "notes", void 0);
    Category = Category_1 = __decorate([
        (0, typeorm_1.Entity)("tb_categories"),
        __metadata("design:paramtypes", [String])
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map