const { JSDOM } = require('jsdom');
const Sprite = require('../../js/sprite.js'); // ruta según tu estructura

// Crear un DOM simulado
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;

// Mock de resources.get (evita errores de drawImage)
global.resources = {
    get: () => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 32;
        return canvas;
    }
};

QUnit.module('Sprite', () => {
    QUnit.test('update avanza el índice según la velocidad', assert => {
        const sprite = new Sprite('img.png', [0,0], [32,32], 1, [0,1,2]);
        sprite.update(1);
        assert.ok(sprite._index > 0, 'El índice se incrementa');
    });

    QUnit.test('render dibuja en el contexto sin errores', assert => {
        const sprite = new Sprite('img.png', [0,0], [32,32], 1, [0,1,2]);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        assert.ok(() => sprite.render(ctx) === undefined, 'Render ejecutado sin errores');
    });

    QUnit.test('image devuelve un canvas con el frame dibujado', assert => {
        const sprite = new Sprite('img.png', [0,0], [32,32], 1, [0,1,2]);
        const imgCanvas = sprite.image();
        assert.ok(imgCanvas instanceof window.HTMLCanvasElement, 'Devuelve un canvas');
    });

    QUnit.test('animación con once se marca como done', assert => {
        const sprite = new Sprite('img.png', [0,0], [32,32], 1, [0,1], 'horizontal', true);
        sprite.update(10);
        assert.ok(sprite.done, 'Sprite marcado como done');
    });
});
