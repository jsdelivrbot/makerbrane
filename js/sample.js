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
