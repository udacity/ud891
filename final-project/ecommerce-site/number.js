var VK_UP         = 38;
var VK_DOWN       = 40;

function SpinButton(spinbutton) {
    this._el = spinbutton;
    this._number = spinbutton.querySelector('.number');
    this._add = spinbutton.querySelector('.add');
    this._subtract = spinbutton.querySelector('.subtract');

    this._add.addEventListener('click', this.increment.bind(this));
    this._subtract.addEventListener('click', this.decrement.bind(this));
    this._el.addEventListener('keydown', this.onKeydown.bind(this));
}

SpinButton.prototype = {
    increment: function() {
        var oldValue = this._number.textContent;
        this._number.textContent = parseInt(oldValue, 10) + 1;
    },

    decrement: function() {
        var oldValue = this._number.textContent;
        this._number.textContent = parseInt(oldValue, 10) - 1;
    },

    onKeydown: function(e) {
        switch (e.keyCode) {
        case VK_UP:
            this.increment();
            e.stopPropagation();
            e.preventDefault();
            break;
        case VK_DOWN:
            this.decrement();
            e.stopPropagation();
            e.preventDefault();
            break;
        }
    }
}


var spinbuttons = document.querySelectorAll('[role=spinbutton]');
for (var i = 0; i < spinbuttons.length; i++) {
    new SpinButton(spinbuttons[i]);
}
