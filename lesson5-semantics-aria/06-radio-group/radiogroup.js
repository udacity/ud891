(function() {
  'use strict';

  // Define values for keycodes
  var VK_ENTER      = 13;
  var VK_SPACE      = 32;
  var VK_LEFT       = 37;
  var VK_UP         = 38;
  var VK_RIGHT      = 39;
  var VK_DOWN       = 40;

  // Helper function to convert NodeLists to Arrays
  function slice(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function RadioGroup(id) {
    this.el = document.querySelector(id);
    this.buttons = slice(this.el.querySelectorAll('.radio'));
    this.focusedIdx = 0;
    this.focusedButton = this.buttons[this.focusedIdx];

    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.el.addEventListener('click', this.handleClick.bind(this));

    // Any more initialization to do here?

    var firstButton = true;
    for (var button of this.buttons) {
      if (firstButton) {
        button.tabIndex = "0";
        firstButton = false;
      } else {
        button.tabIndex = "-1";
      }

      // What about here?
    }

  }

  RadioGroup.prototype.handleKeyDown = function(e) {
    switch(e.keyCode) {

      case VK_UP:
      case VK_LEFT: {

        e.preventDefault();

        this.focusedIdx--;
        if (this.focusedIdx < 0)
          this.focusedIdx = this.focusedIdx + this.buttons.length;

        break;
      }

      case VK_DOWN:
      case VK_RIGHT: {

        e.preventDefault();

        this.focusedIdx = (this.focusedIdx + 1) % this.buttons.length;

        break;
      }

    case VK_SPACE:
        var focusedButton = e.target;
        var idx = this.buttons.indexOf(focusedButton);
        if (idx < 0)
          return;
        this.focusedIdx = idx;
        break;

      default:
        return;
    }

    this.changeFocus();
  };

  RadioGroup.prototype.handleClick = function(e) {
    var button = e.target;
    var idx = this.buttons.indexOf(button);
    if (idx < 0)
      return;
    this.focusedIdx = idx;
    this.changeFocus();
  };

  RadioGroup.prototype.changeFocus = function() {
    // Set the old button to tabindex -1
    this.focusedButton.tabIndex = -1;
    this.focusedButton.removeAttribute('checked');

    // Set the new button to tabindex 0 and focus it
    this.focusedButton = this.buttons[this.focusedIdx];
    this.focusedButton.tabIndex = 0;
    this.focusedButton.focus();
    this.focusedButton.setAttribute('checked', '');

    // ... we probably want to do some stuff here, too ...

  };

  var group1 = new RadioGroup('#group1');

}());
