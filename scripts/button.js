export function button(sheet, onPressCallback) {

    const buttonHolder = new PIXI.Container();
    const buttonBottom = new PIXI.Sprite(sheet.textures['press_bottom.png']); 
    buttonHolder.addChild(buttonBottom);
    const buttonTop = new PIXI.Sprite(sheet.textures['press_top.png']);
    buttonHolder.addChild(buttonTop);
    buttonHolder.pivot.set(0.5 * buttonBottom.width, 0.5 * buttonBottom.height);
    
    buttonHolder.interactive = true;
    buttonHolder.on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp);

    function onButtonUp() {
        gsap.to(buttonTop, { y: 0, duration: .2, ease: "power2.in" });  
        onPressCallback();
    }
    
    function onButtonDown() {
        gsap.to(buttonTop, { y: 5, duration: .2, ease: "power2.out" });  
    }

    return buttonHolder;
}