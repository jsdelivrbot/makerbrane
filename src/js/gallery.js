gallery = function() {
    const visible = document.querySelector("#gallery");
    const hidden = document.querySelector("#temp");
    const filterGallery = function(string) {
    };
    const getModels = function () {
        return visible.children;
    };
    return {getModels:getModels}
}();
console.log(gallery.getModels());
