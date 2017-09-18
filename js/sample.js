// Testing rotation, translation, getting global position and calculating distance
// between 2 models
var sys = document.querySelector('a-scene').systems['focus-system'];
var translationUnits = 1;
var rotationUnits = 30;

$('#translateX').click(function() {
    sys.translate(new THREE.Vector3(translationUnits, 0, 0));
});
$('#translateY').click(function() {
    sys.translate(new THREE.Vector3(0, translationUnits, 0));
});
$('#translateZ').click(function() {
    sys.translate(new THREE.Vector3(0, 0, translationUnits));
});
$('#rotateX').click(function() {
    sys.rotate(new THREE.Vector3(rotationUnits, 0, 0));
});
$('#rotateY').click(function() {
    sys.rotate(new THREE.Vector3(0, rotationUnits, 0));
});
$('#rotateZ').click(function() {
    sys.rotate(new THREE.Vector3(0, 0, rotationUnits));
});
$('#global').click(function() {
    var models = sys.models;
    if (models.length === 0)
        console.warn("You need to focus at least one model");
    else 
        console.log(sys.models[0].object3D.getWorldPosition());
});
$('#distance').click(function() {
    var models = sys.models;
    if (models.length < 2 )
        console.warn("You need to focus at least two models");
    else  {
        console.log(utils.getDistance(
            models[0].object3D.getWorldPosition(), 
            models[1].object3D.getWorldPosition()
        ));
    }
});
