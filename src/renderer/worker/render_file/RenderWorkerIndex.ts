import { onerrorHandler, onmessageHandler } from "./RenderWorkerSystem";

onerror = (msg: string, fileName: string, lineno: number) => {
    onerrorHandler(msg, fileName, lineno);
};

onmessage = (e) => {
    onmessageHandler(e);
};

/*!
export for unit test
 */
export { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
export { GPUDetector } from "../../device/GPUDetector";
export { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
export { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
export { DataBufferConfig } from "../../../config/DataBufferConfig";
export { GeometryWorkerData } from "./geometry/GeometryWorkerData";
export { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
export { GLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerData";
export { LocationWorkerData } from "./shader/location/LocationWorkerData";
export { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
export { DirectionLightWorkerData } from "./light/DirectionLightWorkerData";
export { PointLightWorkerData } from "./light/PointLightWorkerData";
export { DrawRenderCommandBufferWorkerData } from "./draw/DrawRenderCommandBufferWorkerData";
export { ERenderWorkerState } from "../both_file/ERenderWorkerState";

