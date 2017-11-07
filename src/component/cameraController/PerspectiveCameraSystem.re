open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateUtils;

open CameraControllerDirtySystem;

let getFovy = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  HashMapSystem.get(Js.Int.toString(cameraController), cameraData.fovyMap);

let setFovy = (cameraController: cameraController, fovy: float, state: StateDataType.state) => {
  HashMapSystem.set(
    Js.Int.toString(cameraController),
    fovy,
    getPerspectiveCameraData(state).fovyMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getAspect = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  HashMapSystem.get(Js.Int.toString(cameraController), cameraData.aspectMap);

let setAspect = (cameraController: cameraController, aspect: float, state: StateDataType.state) => {
  HashMapSystem.set(
    Js.Int.toString(cameraController),
    aspect,
    getPerspectiveCameraData(state).aspectMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getNear = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  HashMapSystem.get(Js.Int.toString(cameraController), cameraData.nearMap);

let setNear = (cameraController: cameraController, near: float, state: StateDataType.state) => {
  HashMapSystem.set(
    Js.Int.toString(cameraController),
    near,
    getPerspectiveCameraData(state).nearMap
  )
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getFar = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  HashMapSystem.get(Js.Int.toString(cameraController), cameraData.farMap);

let setFar = (cameraController: cameraController, far: float, state: StateDataType.state) => {
  HashMapSystem.set(Js.Int.toString(cameraController), far, getPerspectiveCameraData(state).farMap)
  |> ignore;
  CameraControllerDirtySystem.addToDirtyList(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let _setPMatrix =
    (
      cameraController: cameraController,
      cameraControllerData: cameraControllerData,
      pMatrix: Js.Array.t(float)
    ) =>
  HashMapSystem.set(Js.Int.toString(cameraController), pMatrix, cameraControllerData.pMatrixMap);

let update = (index: int, cameraControllerData: cameraControllerData) => {
  let cameraData = getPerspectiveCameraDataFromCameraControllerData(cameraControllerData);
  switch (
    getFovy(index, cameraData),
    getAspect(index, cameraData),
    getNear(index, cameraData),
    getFar(index, cameraData)
  ) {
  /* | (None, _, _, _)
     | (_, None, _, _)
     | (_, _, None, _)
     | (_, _, _, None) => ExceptionHandlerSystem.failwith "fovy,aspect,near,far should all exist" */
  | (Some(fovy), Some(aspect), Some(near), Some(far)) =>
    Matrix4System.buildPerspective(fovy, aspect, near, far)
    |> _setPMatrix(index, cameraControllerData)
    |> ignore
  | (_, _, _, _) => ExceptionHandlerSystem.throwMessage("fovy,aspect,near,far should all exist")
  };
  ()
};

let init = (index: int, cameraControllerData: cameraControllerData) =>
  update(index, cameraControllerData);

let initData = () => {
  nearMap: HashMapSystem.createEmpty(),
  farMap: HashMapSystem.createEmpty(),
  fovyMap: HashMapSystem.createEmpty(),
  aspectMap: HashMapSystem.createEmpty()
};
