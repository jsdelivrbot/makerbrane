var sceneEl = document.querySelector('a-scene');

const setGridVisiblity = function(event) {
    if (sceneEl.hasAttribute('gridHelper'))
        sceneEl.removeAttribute('gridHelper');
    else
        sceneEl.setAttribute('gridHelper','');
};
/**
 * GLOBAL
 */
const gridVisibilityButton = document.querySelector('#gridVisibilityButton');
/**
 * EVENT HANDLERS
 */
gridVisibilityButton.addEventListener('click', setGridVisiblity, false);

