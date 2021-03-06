import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

export default class Mesh extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BoxBufferGeometry(10, 10, 10);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: require('./glsl/mesh.vs'),
      fragmentShader: require('./glsl/mesh.fs'),
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Mesh';
  }
  render(time) {
    this.material.uniforms.time.value += time;
  }
}
