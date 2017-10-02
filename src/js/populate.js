// Create an element for the hierarchy
var Module = function() {
    var div = document.createElement('div');
    const validTags = ['A-REF-POINT', 'A-GLTF-MODEL'];
    const createString = function(tag) {
        var elemString =
            '<ul class="collapsible" data-collapsible="accordion">'+
            '<li>'+
            '<div class="collapsible-header pink lighten-1"><i class="material-icons">arrow_drop_down</i>'+tag+'</div>'+
            '<div class="collapsible-body"></div>'+
            '</li>'+
            '</ul>';
        return elemString;
    };
    const validTag = function (tag) {
        for (var i = 0; i < validTags.length; ++i)
            if (validTags[i] === tag)
                return true;
        return false;
    };
    const createEl = function(element) {
        var sys = document.querySelector('a-scene').systems['focus-system'];
        tag = element.tagName;
        div.innerHTML = createString(tag);
        console.log(div.firstChild);
        div.firstChild.addEventListener('click', function() {
            if (!keys.keysPressed[17])
                sys.unfocusAll();
            sys.focus(element);
        });
        return div.firstChild;
    };
    return {createEl:createEl, validTag: validTag}
}();

/**
 * Recursive function that creates elements for the hierarchy
 */
const populateElem = function (parentElem, children) {
    for (var i = 0; i < children.length; ++i) {
        var child = children[i];
        var tag = child.tagName;
        if (tag !== undefined && Module.validTag(tag)) {
            var collabsable = Module.createEl(child);
            var grandchildren = child.children;
            if (grandchildren !== undefined) {
                // Get the collapsible-body to insert the grandchildren
                populateElem(collabsable.children[0].children[1] , grandchildren);
            }
            parentElem.appendChild(collabsable);
        }
    }
    // Make them collapsible after populating them
    $(document).ready(function(){
        $('.collapsible').collapsible();
    });
};

const hierarchy = document.querySelector('#hierarchy');
var assets = document.querySelector('a-gltf-model');

assets.addEventListener("ref-points-loaded", function(){
    var elements = document.querySelector('a-scene').children;
    populateElem(hierarchy, elements)
}, false);
