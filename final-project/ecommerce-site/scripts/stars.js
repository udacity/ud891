var VK_PGUP = 33;
var VK_PGDN = 34;
var VK_END = 35;
var VK_HOME = 36;
var VK_LEFT = 37;
var VK_UP = 38;
var VK_RIGHT = 39;
var VK_DOWN = 40;

function Stars(stars) {
  this._el = stars;
  this._stars = Array.prototype.slice.call(stars.querySelectorAll('.star'));
  for (var star of this._stars) {
    star.addEventListener('mouseenter', this.hoverStart.bind(this));
    star.addEventListener('mouseleave', this.hoverEnd.bind(this));
    star.addEventListener('click', this.select.bind(this));
  }

  this._minValue = 0;
  this._maxValue = this._stars.length;

  this.setValue(0);

  // FIXME: Set role
  // hint: https://www.w3.org/TR/wai-aria/roles
  // hint: "A user input where the user selects a value from within a given range"

  // FIXME: Reflect minimum and maximum value for assistive technology
  // hint: https://www.w3.org/TR/wai-aria-practices-1.1/

  // FIXME: Keyboard event handling
  // hint: https://www.w3.org/TR/wai-aria-practices-1.1/
}

Stars.prototype = {
  showStars: function(numStarsOn) {
    this._stars.forEach(function(star, i) {
      if (i < numStarsOn)
        star.querySelector('img').src = 'images/star-on.png';
      else
        star.querySelector('img').src = 'images/star-off.png';
    });
  },

  set currentValue(value) {
    this._value = value;
    // FIXME: reflect current value for assistive technology
    // FIXME: provide value text for assistive technology: "No stars", "1 star" etc.
  },

  get currentValue() {
    return this._value;
  },

  setValue: function(value) {
    this.currentValue = value;
    this.showStars(value);
  },

  increment: function() {
    var currentValue = this.currentValue;
    if (currentValue === this._maxValue)
      return;
    this.currentValue = currentValue + 1;
  },

  decrement: function() {
    var currentValue = this.currentValue;
    if (currentValue === this._minValue)
      return;
    this.currentValue = currentValue - 1;
  },

  select: function(e) {
    var star = e.currentTarget;
    var index = this._stars.indexOf(star);
    this.setValue(index + 1);
  },

  hoverStart: function(e) {
    var star = e.currentTarget;
    var index = this._stars.indexOf(star);
    this.showStars(index + 1);
  },

  hoverEnd: function(e) {
    this.showStars(this.currentValue);
  }
}


var starWidgets = document.querySelectorAll('.stars');
for (var i = 0; i < starWidgets.length; i++) {
  new Stars(starWidgets[i]);
}
