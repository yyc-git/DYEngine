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
import { singleton } from "../../definition/typescript/decorator/singleton";
import { DomEventHandler } from "./DomEventHandler";
import { EEventName } from "../object/EventNameHandler";
import { KeyboardEvent } from "../object/KeyboardEvent";
import { Log } from "../../utils/Log";
import { EventManager } from "../EventManager";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { root } from "../../definition/Variable";
var KeyboardEventHandler = (function (_super) {
    __extends(KeyboardEventHandler, _super);
    function KeyboardEventHandler() {
        return _super.call(this) || this;
    }
    KeyboardEventHandler.getInstance = function () { };
    KeyboardEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventName = null, handler = null, priority = null;
        if (args.length === 3) {
            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            Log.warn("keyboard event can only bind on document.body");
            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }
        this.handler(this.getDefaultDom(), eventName, handler, priority);
    };
    KeyboardEventHandler.prototype.triggerDomEvent = function (dom, event, eventName) {
        var eventObj = this._createEventObject(dom, event, eventName);
        EventManager.trigger(dom, eventObj);
    };
    KeyboardEventHandler.prototype.getDefaultDom = function () {
        return document.body;
    };
    KeyboardEventHandler.prototype.addEngineHandler = function (eventName, handler) {
        var resultHandler = null;
        switch (eventName) {
            case EEventName.KEYDOWN:
                resultHandler = this._handleKeyDown(handler);
                break;
            case EEventName.KEYUP:
                resultHandler = this._handleKeyUp(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }
        return resultHandler;
    };
    KeyboardEventHandler.prototype.createEventData = function () {
        var eventData = Hash.create();
        eventData.addChild("keyState", {});
        return eventData;
    };
    KeyboardEventHandler.prototype._handleKeyDown = function (handler) {
        var self = this;
        return function (event, eventData) {
            var keyState = eventData.getChild("keyState");
            self._setKeyStateAllFalse(keyState);
            keyState[event.key] = true;
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
        };
    };
    KeyboardEventHandler.prototype._handleKeyUp = function (handler) {
        var self = this;
        return function (event, eventData) {
            self._setKeyStateAllFalse(eventData.getChild("keyState"));
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
        };
    };
    KeyboardEventHandler.prototype._copyEventDataToEventObject = function (event, eventData) {
        event.keyState = eventData.getChild("keyState");
    };
    KeyboardEventHandler.prototype._setKeyStateAllFalse = function (keyState) {
        for (var i in keyState) {
            if (keyState.hasOwnProperty(i)) {
                keyState[i] = false;
            }
        }
    };
    KeyboardEventHandler.prototype._createEventObject = function (dom, event, eventName) {
        var obj = KeyboardEvent.create(event ? event : root.event, eventName);
        obj.target = dom;
        return obj;
    };
    return KeyboardEventHandler;
}(DomEventHandler));
KeyboardEventHandler = __decorate([
    singleton(),
    registerClass("KeyboardEventHandler")
], KeyboardEventHandler);
export { KeyboardEventHandler };
//# sourceMappingURL=KeyboardEventHandler.js.map