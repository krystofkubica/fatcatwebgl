# Fat Cat WebGL

This project demonstrates a 3D animated fat cat scene using [Three.js](https://threejs.org/). The scene features a rotating cat model rendered with WebGL. It also incorporates [PointerLockControls](https://threejs.org/docs/#examples/en/controls/PointerLockControls) for an interactive first-person experience.

## Files

- **[index.html](c:\Users\kkubi\Downloads\threejsfun\index.html)**  
  The main HTML file that loads the scene, styles from `style.css`, and the JavaScript from `code.js`.

- **[style.css](c:\Users\kkubi\Downloads\threejsfun\style.css)**  
  Basic CSS to reset body margin and adjust canvas display.

- **[code.js](c:\Users\kkubi\Downloads\threejsfun\code.js)**  
  Contains the JavaScript code that sets up the Three.js scene, creates the cat, and implements camera movement.

## Controls

- Click anywhere on the screen to lock the pointer.
- Use the `W`, `A`, `S`, and `D` keys to move forward, left, backward, and right, respectively.

## Project Structure

```
fat-cat-webgl/
├── code.js
├── index.html
└── style.css
```

## Dependencies

- [Three.js](https://threejs.org/) v0.163.0 (imported via [unpkg](https://unpkg.com/three@0.163.0/build/three.module.js))
- Additional Three.js addons loaded via an import map for PointerLockControls and GLTFLoader.

## License

This project is for educational and experimental purposes.
