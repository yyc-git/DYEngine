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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { CommonBuffer } from "./CommonBuffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
import { DeviceManager } from "../../device/DeviceManager";
import { Log } from "../../utils/Log";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
import { requireCheck, assert } from "../../definition/typescript/decorator/contract";
var ArrayBuffer = (function (_super) {
    __extends(ArrayBuffer, _super);
    function ArrayBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = null;
        _this.data = null;
        return _this;
    }
    ArrayBuffer.create = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, size, type, usage);
        return obj;
    };
    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
        var gl = DeviceManager.getInstance().gl, typedData = null;
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            Log.warn('Failed to create the this.buffer object');
            return null;
        }
        if (!data) {
            return null;
        }
        typedData = this._convertToTypedArray(data, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typedData, gl[usage]);
        BufferTable.resetBindedArrayBuffer();
        this._saveData(typedData, size, type, usage);
        return this.buffer;
    };
    ArrayBuffer.prototype.resetData = function (data, size, type, offset) {
        if (size === void 0) { size = this.size; }
        if (type === void 0) { type = this.type; }
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager.getInstance().gl, typedData = this._convertToTypedArray(data, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.resetBufferData("ARRAY_BUFFER", typedData, offset);
        this._saveData(typedData, size, type, EBufferUsage.DYNAMIC_DRAW);
        return this;
    };
    ArrayBuffer.prototype._convertToTypedArray = function (data, type) {
        return new Float32Array(data);
    };
    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
        this.size = size;
        this.type = type;
        this.count = data.length / size;
        this.usage = usage;
        this.data = data;
    };
    return ArrayBuffer;
}(CommonBuffer));
__decorate([
    requireCheck(function (data, size, type, offset) {
        if (size === void 0) { size = this.size; }
        if (type === void 0) { type = this.type; }
        if (offset === void 0) { offset = 0; }
        assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
    })
], ArrayBuffer.prototype, "resetData", null);
ArrayBuffer = __decorate([
    registerClass("ArrayBuffer")
], ArrayBuffer);
export { ArrayBuffer };
//# sourceMappingURL=ArrayBuffer.js.map