var el = document.querySelector("#sample");
var translationUnits = 1;
var rotationUnits = 30;

$('#translateX').click(function() {
    var curr = el.getAttribute('position');
    el.emit('translate', {vec3: new THREE.Vector3(translationUnits, 0, 0)});
});
$('#translateY').click(function() {
    var curr = el.getAttribute('position');
    el.emit('translate', {vec3: new THREE.Vector3(0, translationUnits, 0)});
});
$('#translateZ').click(function() {
    var curr = el.getAttribute('position');
    el.emit('translate', {vec3: new THREE.Vector3(0, 0, translationUnits)});
});
$('#rotateX').click(function() {
    var curr = el.getAttribute('rotation');
    el.emit('rotate', {vec3: new THREE.Vector3(rotationUnits, 0, 0)});
});
$('#rotateY').click(function() {
    var curr = el.getAttribute('rotation');
    el.emit('rotate', {vec3: new THREE.Vector3(0, rotationUnits, 0)});
});
$('#rotateZ').click(function() {
    var curr = el.getAttribute('rotation');
    el.emit('rotate', {vec3: new THREE.Vector3(0, 0, rotationUnits)});
});
