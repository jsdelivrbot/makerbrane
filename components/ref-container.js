const getObjectJson = function(model)
{
    var assetId = model.getAttribute('src');
    var asset = document.querySelector(assetId);

    if (!asset)
        alert("Error: "+assetId+" Id not found!");

    console.log(asset);
    var assetPath = asset.getAttribute('src');
    var jsonPath = assetPath.substring(0, assetPath.lastIndexOf(".")+1)+"json";
    return jsonPath;
}
AFRAME.registerComponent('ref-container', {
    init: function () {
        var el = this.el;

        (function() {
            var jsonPath = getObjectJson(el);
            $.getJSON(jsonPath, {
                format: "json"
            })
                .done(function(points) {
                    $.each(points, function(point, data) {
                        createRefPoint(el, data);
                    });
                });
        })();

    }
});

const createRefPoint = function (elParent, data)
{
    var refPoint = document.createElement('a-ref-point');
    refPoint.setAttribute('position', data.position);
    elParent.appendChild(refPoint);
}

