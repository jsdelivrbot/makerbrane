(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Layout component for A-Frame.
 * Some layouts adapted from http://www.vb-helper.com/tutorial_platonic_solids.html
 */
AFRAME.registerComponent('layout', {
  schema: {
    angle: {type: 'number', default: false, min: 0, max: 360, if: {type: ['circle']}},
    columns: {default: 1, min: 0, if: {type: ['box']}},
    margin: {default: 1, min: 0, if: {type: ['box', 'line']}},
    plane: {default: 'xy'},
    radius: {default: 1, min: 0, if: {type: ['circle', 'cube', 'dodecahedron', 'pyramid']}},
    reverse: {default: false},
    type: {default: 'line', oneOf: ['box', 'circle', 'cube', 'dodecahedron', 'line',
                                    'pyramid']},
    fill: {default: true, if: {type: ['circle']}}
  },

  /**
   * Store initial positions in case need to reset on component removal.
   */
  init: function () {
    var self = this;
    var el = this.el;

    this.children = el.getChildEntities();
    this.initialPositions = [];

    this.children.forEach(function getInitialPositions (childEl) {
      if (childEl.hasLoaded) { return _getPositions(); }
      childEl.addEventListener('loaded', _getPositions);
      function _getPositions () {
        var position = childEl.getAttribute('position');
        self.initialPositions.push([position.x, position.y, position.z]);
      }
    });

    el.addEventListener('child-attached', function (evt) {
      // Only update if direct child attached.
      if (evt.detail.el.parentNode !== el) { return; }
      self.children.push(evt.detail.el);
      self.update();
    });

    el.addEventListener('child-detached', function (evt) {
      // Only update if direct child detached.
      if (self.children.indexOf(evt.detail.el) === -1) { return; }
      self.children.splice(self.children.indexOf(evt.detail.el), 1);
      self.initialPositions.splice(self.children.indexOf(evt.detail.el), 1);
      self.update();
    });
  },

  /**
   * Update child entity positions.
   */
  update: function (oldData) {
    var children = this.children;
    var data = this.data;
    var el = this.el;
    var numChildren = children.length;
    var positionFn;
    var positions;
    var startPosition = el.getAttribute('position');

    // Calculate different positions based on layout shape.
    switch (data.type) {
      case 'box': {
        positionFn = getBoxPositions;
        break;
      }
      case 'circle': {
        positionFn = getCirclePositions;
        break;
      }
      case 'cube': {
        positionFn = getCubePositions;
        break;
      }
      case 'dodecahedron': {
        positionFn = getDodecahedronPositions;
        break;
      }
      case 'pyramid': {
        positionFn = getPyramidPositions;
        break;
      }
      default: {
        // Line.
        positionFn = getLinePositions;
      }
    }

    positions = positionFn(data, numChildren, startPosition);
    if (data.reverse) { positions.reverse(); }
    setPositions(children, positions);
  },

  /**
   * Reset positions.
   */
  remove: function () {
    this.el.removeEventListener('child-attached', this.childAttachedCallback);
    setPositions(this.children, this.initialPositions);
  }
});

/**
 * Get positions for `box` layout.
 */
function getBoxPositions (data, numChildren, startPosition) {
  var position;
  var positions = [];
  var rows = Math.ceil(numChildren / data.columns);

  for (var row = 0; row < rows; row++) {
    for (var column = 0; column < data.columns; column++) {
      position = [0, 0, 0];
      if (data.plane.indexOf('x') === 0) {
        position[0] = column * data.margin;
      }
      if (data.plane.indexOf('y') === 0) {
        position[1] = column * data.margin;
      }
      if (data.plane.indexOf('y') === 1) {
        position[1] = row * data.margin;
      }
      if (data.plane.indexOf('z') === 1) {
        position[2] = row * data.margin;
      }
      positions.push(position);
    }
  }

  return positions;
}
module.exports.getBoxPositions = getBoxPositions;

/**
 * Get positions for `circle` layout.
 */
function getCirclePositions (data, numChildren, startPosition) {
  var positions = [];

  for (var i = 0; i < numChildren; i++) {
    var rad;

    if (isNaN(data.angle)) {
      rad = i * (2 * Math.PI) / numChildren;
    } else {
      rad = i * data.angle * 0.01745329252;  // Angle to radian.
    }

    var position = [
      startPosition.x,
      startPosition.y,
      startPosition.z
    ];
    if (data.plane.indexOf('x') === 0) {
      position[0] += data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf('y') === 0) {
      position[1] += data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf('y') === 1) {
      position[1] += data.radius * Math.sin(rad);
    }
    if (data.plane.indexOf('z') === 1) {
      position[2] += data.radius * Math.sin(rad);
    }
    positions.push(position);
  }
  return positions;
}
module.exports.getCirclePositions = getCirclePositions;

/**
 * Get positions for `line` layout.
 * TODO: 3D margins.
 */
function getLinePositions (data, numChildren, startPosition) {
  data.columns = numChildren;
  return getBoxPositions(data, numChildren, startPosition);
}
module.exports.getLinePositions = getLinePositions;

/**
 * Get positions for `cube` layout.
 */
function getCubePositions (data, numChildren, startPosition) {
  return transform([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ], startPosition, data.radius / 2);
}
module.exports.getCubePositions = getCubePositions;

/**
 * Get positions for `dodecahedron` layout.
 */
function getDodecahedronPositions (data, numChildren, startPosition) {
  var PHI = (1 + Math.sqrt(5)) / 2;
  var B = 1 / PHI;
  var C = 2 - PHI;
  var NB = -1 * B;
  var NC = -1 * C;

  return transform([
    [-1, C, 0],
    [-1, NC, 0],
    [0, -1, C],
    [0, -1, NC],
    [0, 1, C],
    [0, 1, NC],
    [1, C, 0],
    [1, NC, 0],
    [B, B, B],
    [B, B, NB],
    [B, NB, B],
    [B, NB, NB],
    [C, 0, 1],
    [C, 0, -1],
    [NB, B, B],
    [NB, B, NB],
    [NB, NB, B],
    [NB, NB, NB],
    [NC, 0, 1],
    [NC, 0, -1],
  ], startPosition, data.radius / 2);
}
module.exports.getDodecahedronPositions = getDodecahedronPositions;

/**
 * Get positions for `pyramid` layout.
 */
function getPyramidPositions (data, numChildren, startPosition) {
  var SQRT_3 = Math.sqrt(3);
  var NEG_SQRT_1_3 = -1 / Math.sqrt(3);
  var DBL_SQRT_2_3 = 2 * Math.sqrt(2 / 3);

  return transform([
    [0, 0, SQRT_3 + NEG_SQRT_1_3],
    [-1, 0, NEG_SQRT_1_3],
    [1, 0, NEG_SQRT_1_3],
    [0, DBL_SQRT_2_3, 0]
  ], startPosition, data.radius / 2);
}
module.exports.getPyramidPositions = getPyramidPositions;

/**
 * Multiply all coordinates by a scale factor and add translate.
 *
 * @params {array} positions - Array of coordinates in array form.
 * @returns {array} positions
 */
function transform (positions, translate, scale) {
  translate = [translate.x, translate.y, translate.z];
  return positions.map(function (position) {
    return position.map(function (point, i) {
      return point * scale + translate[i];
    });
  });
};

/**
 * Set position on child entities.
 *
 * @param {array} els - Child entities to set.
 * @param {array} positions - Array of coordinates.
 */
function setPositions (els, positions) {
  els.forEach(function (el, i) {
    var position = positions[i];
    el.setAttribute('position', {
      x: position[0],
      y: position[1],
      z: position[2]
    });
  });
}

},{}],2:[function(require,module,exports){
require('aframe-layout-component');

},{"aframe-layout-component":1}]},{},[2]);
