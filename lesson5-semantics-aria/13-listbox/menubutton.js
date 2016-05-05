(function() {
  'use strict';

  // Define values for keycodes
  var VK_ENTER      = 13;
  var VK_ESC        = 27;
  var VK_SPACE      = 32;
  var VK_LEFT       = 37;
  var VK_UP         = 38;
  var VK_RIGHT      = 39;
  var VK_DOWN       = 40;

  function PopUpButton(buttonEl, menuEl) {
    this.buttonEl = buttonEl;
    this.menu = new Menu(menuEl, this);

    this.buttonEl.addEventListener('click', this.toggleMenu.bind(this));
    this.buttonEl.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  PopUpButton.prototype = {
    focus: function() {
      this.buttonEl.focus();
    },

    toggleMenu: function() {
      this.menu.toggle();
    },

    set value(val) {
      this.buttonEl.textContent = val;
    },

    handleKeyDown: function(e) {
      switch (e.keyCode) {
      case VK_DOWN:
      case VK_ENTER:
      case VK_SPACE:
        if (!this.menu.hidden)
          break;
        this.menu.changeActiveListitem(0);
        this.menu.show();
        e.stopPropagation();
        e.preventDefault();
        break;
      }
      return;
    }
  };

  function Menu(el, button) {
    this.el = el;
    this.button = button;
    this.items = Array.prototype.slice.call(el.querySelectorAll('[role=menuitem]'));
    for (var item of this.items) {
      item.addEventListener('mouseover', this.handleHoverOnItem.bind(this));
      item.addEventListener('click', this.handleClickOnItem.bind(this));
    }

    el.addEventListener('keydown', this.handleKeyDown.bind(this));
    el.addEventListener('blur', this.hide.bind(this));
  }


  Menu.prototype = {
    toggle: function() {
      if (this.hidden) {
        this.show();
      } else {
        this.hide();
      }
    },

    get hidden() {
      return this.el.hasAttribute('hidden');
    },

    get activeItem() {
      return this.el.querySelector('[role=menuitem][active]');
    },

    show: function() {
      if (!this.hidden)
        return;

      this.el.removeAttribute('hidden');
      this.el.focus();
    },

    hide: function() {
      if (this.hidden)
        return;

      this.activeItem.removeAttribute('active');
      this.el.setAttribute('hidden', '');
      this.button.focus();
    },

    selectItem: function(item) {
      var selected = this.el.querySelector('[aria-selected]');
      if (selected && selected != item)
        selected.removeAttribute('aria-selected');
      item.setAttribute('aria-selected', true);

      this.button.value = item.textContent;
      this.hide();
    },

    handleKeyDown: function (e) {
      var active = this.activeItem;
      if (!active)
        activeIdx = -1;
      else
        var activeIdx = this.items.indexOf(active);

      var newIdx = activeIdx;
      switch(e.keyCode) {
      case VK_UP:
      case VK_LEFT:
        if (!active)
          newIdx = this.items.length;

        newIdx--;
        if (newIdx < 0)
          newIdx += this.items.length;
        e.stopPropagation();
        e.preventDefault();
        break;

      case VK_DOWN:
      case VK_RIGHT:
        newIdx = (newIdx + 1) % this.items.length;
        e.stopPropagation();
        e.preventDefault();
        break;

      case VK_SPACE:
      case VK_ENTER:
        this.selectItem(active);
        e.stopPropagation();
        e.preventDefault();
        break;

      case VK_ESC:
        e.stopPropagation();
        e.preventDefault();
        this.hide();
      }

      if (newIdx == activeIdx)
        return;
      this.changeActiveListitem(newIdx);
    },

    handleHoverOnItem: function(e) {
      var newIdx = this.items.indexOf(e.target);
      if (newIdx < 0)
        return;
      this.changeActiveListitem(newIdx);
    },

    handleClickOnItem: function(e) {
      var item = e.target;
      if (this.items.indexOf(item) < 0)
        return;
      this.selectItem(item);
    },

    changeActiveListitem: function(newIdx) {
      var active = this.activeItem;
      var newActive = this.items[newIdx];
      if (active)
        active.removeAttribute('active');
      newActive.setAttribute('active', '');
      this.el.setAttribute('aria-activedescendant', newActive.id);
    }
  };

  var popupbutton = document.querySelector('button[aria-haspopup]');
  var menu = document.querySelector('[role=menu]');

  new PopUpButton(popupbutton, menu);
})()
