

import * as InitJob$WonderEditorCore from "./InitJob.bs.js";

function _getExecFunc(_pipelineName, jobName) {
  if (jobName === "init_root_wonder") {
    return InitJob$WonderEditorCore.exec;
  } else {
    return null;
  }
}

function _init(_state) {
  
}

function getData(param) {
  return {
          pluginName: "wonder-work-plugin-root",
          createStateFunc: (function (param) {
              
            }),
          initFunc: _init,
          getExecFunc: _getExecFunc,
          allPipelineData: [{
              name: "init",
              groups: [{
                  name: "first_root_wonder",
                  link: "concat",
                  elements: [{
                      name: "init_root_wonder",
                      type_: "job"
                    }]
                }],
              first_group: "first_root_wonder"
            }]
        };
}

export {
  _getExecFunc ,
  _init ,
  getData ,
  
}
/* InitJob-WonderEditorCore Not a pure module */
