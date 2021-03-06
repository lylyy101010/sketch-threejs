const THREE = require('three');

export default class PostEffectBright {
  constructor(brightMin, texture) {
    this.uniforms = {
      brightMin: {
        type: 'f',
        value: brightMin,
      },
      texture: {
        type: 't',
        value: texture,
      }
    };
    this.obj;

    this.createObj();
  }
  createObj() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: require('./glsl/postEffect.vs'),
      fragmentShader: require('./glsl/postEffectBright.fs'),
    });

    // Create Object3D
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.visible = false;
  }
  render(renderer, scene, camera, renderTarget) {
    this.obj.visible = true;
    renderer.render(scene, camera, renderTarget);
    this.obj.visible = false;
  }
}
