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
exports.User = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var uuid_1 = require("uuid");
var User = /** @class */ (function () {
    function User(username, senha, photo, id) {
        this.username = username;
        this.pass = senha;
        this.photo = photo;
        if (!id)
            this.id = (0, uuid_1.v4)();
    }
    User_1 = User;
    var User_1;
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        (0, class_validator_1.Length)(3, 30),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], User.prototype, "pass", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        (0, class_validator_1.Length)(0, 500),
        __metadata("design:type", String)
    ], User.prototype, "photo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Category_1.Category; }, function (category) { return category.id; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "categories", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return User_1; }, function (user) { return user.id; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], User.prototype, "notes", void 0);
    User = User_1 = __decorate([
        (0, typeorm_1.Entity)("tb_users"),
        (0, typeorm_1.Unique)(["username"]),
        __metadata("design:paramtypes", [String, String, String, String])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map