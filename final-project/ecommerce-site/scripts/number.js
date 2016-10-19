var VK_UP = 38;
var VK_DOWN = 40;

// Alert the user to the given new value for the number input
function alertNewValue(newValue) {
  // FIXME: implement
  // hint: document.querySelector('#number-live');
}

function SpinButton(spinbutton) {
  this._el = spinbutton;
  this._minValue = parseInt(spinbutton.getAttribute('aria-valuemin'), 10);
  this._maxValue = parseInt(spinbutton.getAttribute('aria-valuemax'), 10);
  this._number = spinbutton.querySelector('.number');
  this._number.value = 0;
  this._add = spinbutton.querySelector('.add');
  this._subtract = spinbutton.querySelector('.subtract');

  this._add.addEventListener('click', this.increment.bind(this));
  this._subtract.addEventListener('click', this.decrement.bind(this));
  this._el.addEventListener('keydown', this.onKeydown.bind(this));
}

SpinButton.prototype = {
  updateValue: function(increment) {
    var oldValue = this._number.textContent;
    var newValue = parseInt(oldValue, 10) + increment;
    if (newValue < this._minValue || newValue > this._maxValue)
      return;
    this._number.textContent = newValue;
    this._el.setAttribute('aria-valuenow', newValue);

    // Work around some screen readers not automatically speaking updated value
    alertNewValue(newValue);
  },

  increment: function() {
    this.updateValue(1);
  },

  decrement: function() {
    this.updateValue(-1);
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


var spinbuttons = document.querySelectorAll('.spinbutton');
for (var i = 0; i < spinbuttons.length; i++) {
  new SpinButton(spinbuttons[i]);
}
