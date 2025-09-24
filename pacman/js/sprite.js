// pacman/js/sprite.js

(function() {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.done = false;
    }

    Sprite.prototype = {
        update: function(dt) {
            if (!this.done) {
                this._index += this.speed * dt;

                // Marcar done si animación "once" completa
                if (this.once && this._index >= this.frames.length) {
                    this.done = true;
                    this._index = this.frames.length - 1; // fijar en último frame
                }
            }
        },

        _render: function() {
            let frame = 0;

            if (this.frames.length > 0) {
                const idx = Math.floor(this._index);
                frame = this.frames[idx % this.frames.length];
            }

            let x = this.pos[0];
            let y = this.pos[1];

            if (this.dir === 'vertical') {
                y += frame * this.size[1];
            } else {
                x += frame * this.size[0];
            }

            return { x: x, y: y };
        },

        render: function(ctx) {
            const pos = this._render();
            ctx.drawImage(
                resources.get(this.url),
                pos.x, pos.y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0] * 1.5, this.size[1] * 1.5
            );
        },

        image: function() {
            const pos = this._render();
            const pattern_canvas = document.createElement('canvas');
            pattern_canvas.width = this.size[0];
            pattern_canvas.height = this.size[1];
            const pattern_context = pattern_canvas.getContext('2d');
            pattern_context.drawImage(
                resources.get(this.url),
                pos.x, pos.y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0], this.size[1]
            );
            return pattern_canvas;
        }
    };

    // Compatibilidad navegador y Node
    if (typeof window !== 'undefined') {
        window.Sprite = Sprite;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Sprite;
    }
})();
