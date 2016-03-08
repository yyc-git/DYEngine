module wd{
    export class MapManager{
        public static create(material:Material) {
            var obj = new this(material);

            return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;
        private _mapTable:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _arrayMapList:wdCb.Collection<ArrayMapData> = wdCb.Collection.create<ArrayMapData>();
        private _mirrorMap:MirrorTexture = null;
        private _textureDirty:boolean = false;
        private _mapArrCache:Array<Texture> = null;

        public init(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.init();
            }
        }

        public addMap(asset:TextureAsset);
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        @require(function(...args){
            assert(args[0] instanceof TextureAsset || args[0] instanceof Texture, Log.info.FUNC_SHOULD("arguments[0]", "be TextureAsset || Texture"));
        })
        public addMap(...args){
            var map:Texture = null;

            if(args[0] instanceof TextureAsset){
                let asset:TextureAsset = args[0];

                map = asset.toTexture();
            }
            else if(args[0] instanceof Texture){
                map = args[0];
            }

            if(args.length === 2){
                let option = args[1];

                this._setMapOption(map, option);
            }

            map.material = this._material;
            this._mapTable.appendChild("map", map);

            this._textureDirty = true;
        }

        public addArrayMap(samplerName:string, mapArray:Array<Texture>){
            this._arrayMapList.addChild({
                samplerName:samplerName,
                mapArray:mapArray
            });

            this._textureDirty = true;
        }

        @ensure(function(mapList:wdCb.Collection<BasicTexture|ProceduralTexture>){
            mapList.forEach((map:BasicTexture|ProceduralTexture) => {
                assert(map instanceof BasicTexture || map instanceof ProceduralTexture, Log.info.FUNC_SHOULD("mapList", "only contain BasicTexture or ProceduralTexture"));
            })
        })
        public getMapList():wdCb.Collection<BasicTexture|ProceduralTexture>{
            var map = this._mapTable.getChild("map");

            return map ? this._mapTable.getChild("map")
                .filter((map:Texture) => {
                    return map instanceof BasicTexture || map instanceof ProceduralTexture;
                }) : wdCb.Collection.create<BasicTexture|ProceduralTexture>();
        }

        public hasMap(func:(...args) => boolean);
        public hasMap(map:Texture);

        public hasMap(...args){
            var mapList:wdCb.Collection<Texture> = null;

            mapList = this._mapTable.getChild("map");

            if(!mapList){
                return false;
            }

            if(JudgeUtils.isFunction(args[0])){
                return mapList.hasChildWithFunc(args[0]);
            }
            else{
                return mapList.hasChild(args[0]);
            }
        }

        public getMapCount(){
            return this.getMapList().getCount();
        }

        public getEnvMap(){
            return this._getMapByType<CubemapTexture>("envMap");
        }

        public setEnvMap(envMap:CubemapTexture){
            this._setMap("envMap", envMap);
        }

        public getMirrorMap(){
            return this._mirrorMap;
        }

        public setMirrorMap(mirrorMap:MirrorTexture){
            this.addMap(mirrorMap, {
                samplerVariableName: VariableNameTable.getVariableName("mirrorReflectionMap")
            });

            this._mirrorMap = mirrorMap;
        }

        public isMirrorMap(map:Texture){
            return map === this._mirrorMap;
        }

        public removeAllChildren(){
            this._mapTable.removeAllChildren();
            this._arrayMapList.removeAllChildren();

            this._textureDirty = true;
        }

        public dispose(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.dispose();
            }

            this.removeAllChildren();
        }

        public bindAndUpdate(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.bindToUnit(i);

                if(texture.needUpdate){
                    texture.update(i);
                }
            }
        }

        public sendData(program:Program){
            this._sendSingleMapData(program);
            this._sendArrayMapData(program);
        }

        private _sendSingleMapData(program:Program){
            var mapArr = this._getAllSingMaps(),
                len = mapArr.length;

            for(let i = 0; i < len; i++){
                let texture = mapArr[i];

                texture.sendData(program, texture.getSamplerName(i), i);
            }
        }

        private _sendArrayMapData(program:Program){
            var self = this,
                maxUnitOfBindedSingleMap = this._getMaxUnitOfBindedSingleMap();

            this._arrayMapList.forEach((mapData:ArrayMapData) => {
                let arrayMapCount = mapData.mapArray.length;



                //program.sendUniformData(mapData.samplerName, EVariableType.SAMPLER_ARRAY, mapData.mapArray);
                //todo unit array
                program.sendUniformData(`${mapData.samplerName}[0]`, EVariableType.SAMPLER_ARRAY, self._generateArrayMapUnitArray(maxUnitOfBindedSingleMap, maxUnitOfBindedSingleMap + arrayMapCount));


                maxUnitOfBindedSingleMap += arrayMapCount;
            });
        }

        @ensure(function(arr:Array<number>, startUnit:number, endUnit:number){
            assert(arr.length === endUnit - startUnit, Log.info.FUNC_SHOULD("length", `be ${endUnit - startUnit}, but actual is ${arr.length}`));
            assert(arr[0] === startUnit, Log.info.FUNC_SHOULD("first element", `be ${startUnit}, but actual is ${arr[0]}`));
            assert(arr[arr.length - 1] === endUnit - 1, Log.info.FUNC_SHOULD("last element", `be ${endUnit - 1}, but actual is ${arr[arr.length - 1]}`));
        })
        private _generateArrayMapUnitArray(startUnit:number, endUnit:number){
            var arr = [];

            while(endUnit > startUnit){
                arr.push(startUnit);

                startUnit++;
            }

            return arr;
        }

        @ensure(function(mapArr:Array<Texture>){
            for(let map of mapArr){
                assert(map instanceof Texture, Log.info.FUNC_SHOULD("each element", "be Texture"));
            }
        })
        @cache(function(){
            return !this._textureDirty && this._mapArrCache;
        }, function(){
            return this._mapArrCache;
        }, function(mapList:wdCb.Collection<Texture>){
            this._mapArrCache = mapList;
            this._textureDirty = false;
        })
        private _getAllMaps(){
            //var arrayMap = [];
            //
            //this._arrayMapList.forEach((mapData:ArrayMapData) => {
            //    arrayMap = arrayMap.concat(mapData.mapList.toArray());
            //});

            //return [].concat(this._mapTable.toArray(), arrayMap);
            //return [].concat(this._mapTable.toArray(), this._getAllArrayMaps());
            return [].concat(this._getAllSingMaps(), this._getAllArrayMaps());
        }

        private _getMaxUnitOfBindedSingleMap(){
            return this._getAllSingMaps().length;
        }

        //todo add cache
        private _getAllSingMaps(){
            return this._mapTable.toArray();
        }

        @ensure(function(mapArr:Array<Texture>){
            for(let map of mapArr){
                assert(map instanceof Texture, Log.info.FUNC_SHOULD("each element", "be Texture"));
            }
        })
        //todo add cache
        //@cache(function(){
        //    return !this._textureDirty && this._mapArrCache;
        //}, function(){
        //    return this._mapArrCache;
        //}, function(mapList:wdCb.Collection<Texture>){
        //    this._mapArrCache = mapList;
        //    this._textureDirty = false;
        //})
        private _getAllArrayMaps(){
            var arrayMap = [];

            this._arrayMapList.forEach((mapData:ArrayMapData) => {
                arrayMap = arrayMap.concat(mapData.mapArray);
            });

            return arrayMap;
        }

        private _getMapByType<T>(key:string):T{
            return this._mapTable.getChild(key);
        }

        private _setMap(key:string, map:Texture);
        private _setMap(key:string, map:Texture, option:MapVariableData);

        private _setMap(...args){
            var key:string = args[0],
                map:Texture = args[1];

            if(!map){
                this._removeMap(key, map);

                return;
            }

            if(arguments.length === 3){
                let option:MapVariableData = args[1];

                this._setMapOption(map, option);
            }

            map.material = this._material;

            this._mapTable.addChild(key, map);
        }

        private _removeMap(key:string, map:Texture){
            this._mapTable.removeChild(key);
            this._textureDirty = true;
        }

        private _setMapOption(map:Texture, option:MapVariableData){
            map.variableData = option;
        }
    }

    export type MapVariableData = {
        samplerVariableName?: string;
        samplerData?:any
    }

    export type ArrayMapData = {
        samplerName:string;
        mapArray:Array<Texture>;
    }
}
