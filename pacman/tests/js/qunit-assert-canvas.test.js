// test.js
const { JSDOM } = require("jsdom");

// Crear un DOM simulado con canvas
const { window } = new JSDOM(`<!DOCTYPE html><canvas id="canvas" width="1" height="1"></canvas>`);
global.window = window;
global.document = window.document;

// Mock de Image para Node
global.Image = class {
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
};

// Obtener canvas y contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// QUnit
const QUnit = require("qunit");

// ==========================
// Extensiones pixelEqual / pixelNotEqual
// ==========================
QUnit.extend(QUnit.assert, {
  pixelEqual: function(canvas, x, y, r, g, b, a, message) {
    var actual = Array.prototype.slice.call(canvas.getContext("2d").getImageData(x, y, 1, 1).data);
    var expected = [r, g, b, a];

    this.pushResult({
      result: QUnit.equiv(actual, expected),
      actual: actual,
      expected: expected,
      message: message || `Pixel debe ser ${expected}`
    });
  },

  pixelNotEqual: function(canvas, x, y, r, g, b, a, message) {
    var actual = Array.prototype.slice.call(canvas.getContext("2d").getImageData(x, y, 1, 1).data);
    var expected = [r, g, b, a];

    this.pushResult({
      result: !QUnit.equiv(actual, expected),
      actual: actual,
      expected: expected,
      message: message || `Pixel no debe ser ${expected}`
    });
  }
});

// ==========================
// Tests de ejemplo
// ==========================
QUnit.module("Canvas Pixel Tests", () => {

  QUnit.test("Pixel rojo y azul", assert => {
    // Pintar rojo
    ctx.fillStyle = "rgba(255,0,0,255)";
    ctx.fillRect(0, 0, 1, 1);
    assert.pixelEqual(canvas, 0, 0, 255, 0, 0, 255, "Pixel es rojo");

    // Pintar azul
    ctx.fillStyle = "rgba(0,0,255,255)";
    ctx.fillRect(0, 0, 1, 1);
    assert.pixelNotEqual(canvas, 0, 0, 255, 0, 0, 255, "Pixel no es rojo");
    assert.pixelEqual(canvas, 0, 0, 0, 0, 255, 255, "Pixel es azul");
  });

});

// Ejecutar tests si se ejecuta directamente con Node
if (require.main === module) {
  QUnit.start();
}
