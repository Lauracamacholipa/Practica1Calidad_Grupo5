// pacman/tests/js/pacman.test.js

// === Simulación del DOM con JSDOM ===
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
global.Image = window.Image;
global.HTMLCanvasElement = window.HTMLCanvasElement;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;

// === Importar archivos del proyecto ===
import '../../js/pacman.js';
import '../../js/resources.js';
import '../../js/sprite.js';

// === QUnit ===
import QUnit from 'qunit';
const { module, test } = QUnit;

// === Tests ===

// Tests de Resources
module('Resources', () => {
    test('Carga de una imagen', (assert) => {
        const done = assert.async();
        Resources.load('test.png');
        Resources.onReady(() => {
            assert.ok(Resources.get('test.png') instanceof Image, 'La imagen se cargó correctamente');
            done();
        });
    });

    test('Carga de múltiples imágenes', (assert) => {
        const done = assert.async();
        Resources.load(['img1.png', 'img2.png']);
        Resources.onReady(() => {
            assert.ok(Resources.get('img1.png') instanceof Image, 'img1 cargada');
            assert.ok(Resources.get('img2.png') instanceof Image, 'img2 cargada');
            done();
        });
    });

    test('isReady funciona correctamente', (assert) => {
        assert.equal(Resources.isReady(), true, 'Todos los recursos están listos');
    });
});

// Tests de Sprite
module('Sprite', () => {
    test('update avanza el índice según la velocidad', (assert) => {
        const sprite = new Sprite('test.png', 1, 10);
        sprite.update();
        assert.ok(sprite.index > 0, 'El índice aumentó');
    });

    test('render dibuja en el contexto sin errores', (assert) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const sprite = new Sprite('test.png', 1, 10);
        assert.doesNotThrow(() => sprite.render(ctx), 'Render sin errores');
    });

    test('image devuelve un canvas con el frame dibujado', (assert) => {
        const sprite = new Sprite('test.png', 1, 10);
        const imgCanvas = sprite.image();
        assert.ok(imgCanvas instanceof HTMLCanvasElement, 'Se devuelve un canvas');
    });

    test('animación con once se marca como done', (assert) => {
        const sprite = new Sprite('test.png', 1, 1);
        sprite.update();
        assert.equal(sprite.done, true, 'La animación se completó');
    });
});
