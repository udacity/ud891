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
  this._el.setAttribute('aria-valuemin', this._minValue);
  this._maxValue = this._stars.length;
  this._el.setAttribute('aria-valuemax', this._maxValue);

  this.setValue(0);

  this._el.setAttribute('role', 'slider');
  this._el.tabIndex = 0;

  this._el.addEventListener('keydown', this.onKeydown.bind(this));
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
    this._el.setAttribute('aria-valuenow', value);
    var englishValue = (value === 0 ? 'No' : value) + ' star' + (value !== 1 ? 's' : '');
    this._el.setAttribute('aria-valuetext', englishValue);
  },

  get currentValue() {
    return parseInt(this._el.getAttribute('aria-valuenow'));
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
  },

  onKeydown: function(e) {
    switch (e.keyCode) {
      case VK_UP:
      case VK_RIGHT:
        this.increment();
        this.showStars(this.currentValue);
        e.stopPropagation();
        e.preventDefault();
        break;
      case VK_DOWN:
      case VK_LEFT:
        this.decrement();
        this.showStars(this.currentValue);
        e.stopPropagation();
        e.preventDefault();
        break;
      case VK_HOME:
      case VK_PGUP:
        this.setValue(this._minValue);
        this.showStars(this.currentValue);
        e.stopPropagation();
        e.preventDefault();
        break;
      case VK_END:
      case VK_PGDN:
        this.setValue(this._maxValue);
        this.showStars(this.currentValue);
        e.stopPropagation();
        e.preventDefault();
        break;
    }
  }
}


var starWidgets = document.querySelectorAll('.stars');
for (var i = 0; i < starWidgets.length; i++) {
  new Stars(starWidgets[i]);
}
