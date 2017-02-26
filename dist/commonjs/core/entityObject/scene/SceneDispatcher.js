"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var EntityObject_1 = require("../EntityObject");
var GameObject_1 = require("../gameObject/GameObject");
var GameObjectScene_1 = require("./gameObjectScene/GameObjectScene");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var SceneDispatcher = (function (_super) {
    __extends(SceneDispatcher, _super);
    function SceneDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "scene" + String(_this.uid);
        _this.gameObjectScene = GameObjectScene_1.GameObjectScene.create();
        return _this;
    }
    SceneDispatcher.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Object.defineProperty(SceneDispatcher.prototype, "currentCamera", {
        get: function () {
            return this.gameObjectScene.currentCamera;
        },
        set: function (arg) {
            this.gameObjectScene.currentCamera = arg;
        },
        enumerable: true,
        configurable: true
    });
    SceneDispatcher.prototype.addChild = function (child) {
        if (child instanceof GameObject_1.GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;
        return this;
    };
    SceneDispatcher.prototype.dispose = function () {
        this.gameObjectScene.dispose();
    };
    SceneDispatcher.prototype.hasChild = function (child) {
        if (child instanceof GameObject_1.GameObject) {
            return this.gameObjectScene.hasChild(child);
        }
    };
    SceneDispatcher.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof EntityObject_1.EntityObject) {
            var child = args[0];
            this.addChild(child);
        }
        if (args[0] instanceof Collection_1.Collection) {
            var children = args[0], self_1 = this;
            children.forEach(function (child) {
                self_1.addChild(child);
            });
        }
        else if (JudgeUtils_1.JudgeUtils.isArrayExactly(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                this.addChild(child);
            }
        }
        return this;
    };
    SceneDispatcher.prototype.getChildren = function () {
        return this.gameObjectScene.getChildren();
    };
    SceneDispatcher.prototype.createTransform = function () {
        return null;
    };
    return SceneDispatcher;
}(EntityObject_1.EntityObject));
SceneDispatcher = __decorate([
    registerClass_1.registerClass("SceneDispatcher")
], SceneDispatcher);
exports.SceneDispatcher = SceneDispatcher;
//# sourceMappingURL=SceneDispatcher.js.map