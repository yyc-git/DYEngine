import { getScreenPass, getWebGPU } from "../../../data/Repo";

export let exec = () => {
    let { device, context } = getWebGPU();
    let {
        bindGroup,
        pipeline
    } = getScreenPass();

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: textureView,
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    };
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.draw(3, 1, 0, 0)
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
}