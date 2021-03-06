const THREE = require('three');

export default class BackgroundImage {
  constructor() {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
      },
      imageResolution: {
        type: 'v2',
        value: new THREE.Vector2(2048, 1356),
      },
      texture: {
        type: 't',
        value: null,
      },
    };
    this.obj;
  }
  init(callback) {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/sketch-threejs/img/sketch/glitch/osaka.jpg',
      (tex) => {
      this.uniforms.texture.value = tex;
      this.obj = this.createObj();
      callback();
    })
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: require('./glsl/backgroundImage.vs'),
        fragmentShader: require('./glsl/backgroundImage.fs'),
      })
    );
  }
  resize() {
    this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
  }
}
