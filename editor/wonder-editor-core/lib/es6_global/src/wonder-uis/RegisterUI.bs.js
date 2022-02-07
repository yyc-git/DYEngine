

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$WonderEditorCore from "../Utils.bs.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";
import * as TriggerTest1$WonderEditorCore from "./TriggerTest1.bs.js";
import * as DefaultEventName$WonderEditorCore from "../DefaultEventName.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerUI"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                var partial_arg = Utils$WonderEditorCore.buildAPI(undefined);
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
                            id: "triggerTest1",
                            func: (function (param) {
                                return TriggerTest1$WonderEditorCore.execFunc(partial_arg, param);
                              }),
                            stateValue: {
                              x: 300,
                              y: 240,
                              width: 20,
                              height: 10,
                              text: "trigger_test1"
                            }
                          });
              }));
}

export {
  execFunc ,
  
}
/* No side effect */
