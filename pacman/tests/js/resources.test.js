const { JSDOM } = require('jsdom');
const resources = require('../../js/resources.js'); // ruta relativa correcta

// Simula un DOM en Node
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;

// Mock de Image para Node (evita errores de load)
global.Image = class {
    constructor() { this.onload = null; }
    set src(_) { if(this.onload) this.onload(); }
};

QUnit.module('Resources', () => {
    QUnit.test('Carga de una imagen', assert => {
        assert.expect(1);
        resources.load('img/test.png');
        assert.ok(resources.get('img/test.png'), 'La imagen se carga correctamente');
    });

    QUnit.test('Carga de múltiples imágenes', assert => {
        assert.expect(2);
        resources.load(['img/a.png','img/b.png']);
        assert.ok(resources.get('img/a.png'), 'Imagen a cargada');
        assert.ok(resources.get('img/b.png'), 'Imagen b cargada');
    });

    QUnit.test('isReady funciona correctamente', assert => {
        assert.expect(1);
        resources.load('img/ready.png');
        assert.ok(resources.isReady(), 'isReady devuelve true después de cargar');
    });
});
