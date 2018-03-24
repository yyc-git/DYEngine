open GlType;

open Gl;

open MainStateDataType;

open MainStateDataType;

open SendGLSLDataMainService;

let addUniformSendDataByType =
    (
      pos,
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      ),
      (getDataFunc, sendDataFunc)
    ) => (
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({pos, sendDataFunc, getDataFunc}: uniformInstanceSendNoCachableData)
);

let setToUniformSendMap =
    (shaderIndex, uniformInstanceSendNoCachableDataMap, instanceSendNoCachableDataArr) =>
  uniformInstanceSendNoCachableDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;

let unsafeGetUniformSendData = (shaderIndex: int, state: MainStateDataType.state) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    state.glslSenderRecord.uniformInstanceSendNoCachableDataMap
  );