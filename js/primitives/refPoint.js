// Primitive for ref points
AFRAME.registerPrimitive('a-ref-point', {
  defaultComponents: {
      geometry: {
          primitive: 'sphere',
          radius: '0.2',
      }, 
      material: {
          color: 'yellow',
          opacity: '0.5',
      }
  }
});

