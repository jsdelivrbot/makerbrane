const camera = document.querySelector("#camera");
const cameraLook = function (e) {
    return;
    //console.log(camera.getAttribute('camera'));
    var pos = camera.getAttribute('position');
    if (keys.keysPressed[87]) {
        console.log(camera.getAttribute('position'));
        var newPos=Number(pos.y)+1;
        var newPos="1 "+newPos+" 1";
        camera.setAttribute('position',newPos);
        console.log("up")
    }
    if (keys.keysPressed[83]) {
        console.log("down")
    }
    if (keys.keysPressed[68]) {
        console.log("right");
    }
    if (keys.keysPressed[65]) {
        console.log("left");
    }
}
window.addEventListener('keydown', cameraLook, false);
