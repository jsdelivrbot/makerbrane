AFRAME.registerComponent('ref-container', {
    init: function () {
        (function() {
            console.log(this.el);
            var flickerAPI = "";
            /** $.getJSON( flickerAPI, {
                tags: "mount rainier",
                tagmode: "any",
                format: "json"
            })
                .done(function( data ) {
                    $.each( data.items, function( i, item ) {
                        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
                        if ( i === 3 ) {
                            return false;
                        }
                    });
                 });
                 **/
        })();
    }
});

const createRefPoint = function (elParent, data)
{
    var refPoint = document.createElement('a-ref-point');
    refPoint.setAttribute('position', data.position);
    elParent.appendChild(refPoint);
}

