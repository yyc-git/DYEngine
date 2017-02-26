/// <reference types="wonder-commonlib" />
import { ShaderSourceBuilder, SourceDefine } from "./ShaderSourceBuilder";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EngineShaderLib } from "../lib/EngineShaderLib";
export declare class EngineShaderSourceBuilder extends ShaderSourceBuilder {
    static create(): EngineShaderSourceBuilder;
    vsSourceTop: string;
    vsSourceDefine: string;
    vsSourceVarDeclare: string;
    vsSourceFuncDeclare: string;
    vsSourceFuncDefine: string;
    vsSourceBody: string;
    fsSourceTop: string;
    fsSourceDefine: string;
    fsSourceVarDeclare: string;
    fsSourceFuncDeclare: string;
    fsSourceFuncDefine: string;
    fsSourceBody: string;
    vsSourceDefineList: Collection<SourceDefine>;
    fsSourceDefineList: Collection<SourceDefine>;
    vsSourceExtensionList: Collection<string>;
    fsSourceExtensionList: Collection<string>;
    build(libs: Collection<EngineShaderLib>): void;
    clearShaderDefinition(): void;
    private _readLibSource(libs);
    private _judgeAndSetVsSource(setSourceLibs);
    private _judgeAndSetFsSource(setSourceLibs);
    private _judgeAndSetPartSource(libs);
    private _buildVsSource();
    private _buildFsSource();
    private _buildVsSourceTop();
    private _buildVsSourceDefine();
    private _buildVsSourceExtension();
    private _buildVsSourceVarDeclare();
    private _buildVsSourceFuncDeclare();
    private _buildVsSourceFuncDefine();
    private _buildVsSourceBody();
    private _buildFsSourceTop();
    private _buildFsSourceDefine();
    private _buildFsSourceExtension();
    private _buildFsSourceVarDeclare();
    private _buildFsSourceFuncDeclare();
    private _buildFsSourceFuncDefine();
    private _buildFsSourceBody();
    private _buildSourceDefine(defineList);
    private _buildSourceExtension(extensionList);
    private _getPrecisionSource();
    private _generateAttributeSource();
    private _generateUniformSource(sourceVarDeclare, sourceFuncDefine, sourceBody);
    private _isExistInSource(key, source);
}
