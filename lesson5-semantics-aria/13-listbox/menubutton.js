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

  function toggleMenu() {
    if (menu.hasAttribute('hidden')) {
      menu.removeAttribute('hidden');
      menu.focus();
    } else {
      closeMenu();
    }
  }

  function closeMenu() {
    menu.setAttribute('hidden', '');
  }

  function handleKeyDownOnButton(e) {
    switch (e.keyCode) {
      case VK_DOWN:
      case VK_ENTER:
      case VK_SPACE:
        if (!menu.hasAttribute('hidden'))
          break;
        changeActiveListitem(0);
        toggleMenu();
        break;
    }
    return;
  }

  var popupbutton = document.querySelector('button[aria-haspopup]');
  popupbutton.addEventListener('click', toggleMenu);
  popupbutton.addEventListener('keydown', handleKeyDownOnButton);

  var menu = document.querySelector('[role=menu]');
  var listitems = Array.prototype.slice.call(menu.querySelectorAll('[role=menuitem]'));


  function handleKeyDown(e) {
    var active = menu.querySelector('[role=menuitem][active]');
    if (!active)
      activeIdx = -1;
    else
      var activeIdx = listitems.indexOf(active);

    var newIdx = activeIdx;
    switch(e.keyCode) {
      case VK_UP:
      case VK_LEFT:
        if (!active)
          newIdx = listitems.length;

        newIdx--;
        if (newIdx < 0)
          newIdx += listitems.length;
        break;

      case VK_DOWN:
      case VK_RIGHT:
        newIdx = (newIdx + 1) % listitems.length;
        break;

      case VK_SPACE:
      case VK_ENTER:
        var selected = menu.querySelector('[aria-selected]');
        if (selected && selected != active)
          selected.removeAttribute('aria-selected');
        active.setAttribute('aria-selected', true);
        popupbutton.textContent = active.textContent;
        closeMenu();
        popupbutton.focus();
        break;

      case VK_ESC:
        closeMenu();
    }

    if (newIdx == activeIdx)
      return;
    changeActiveListitem(newIdx);
  }

  function changeActiveListitem(newIdx) {
    var active = menu.querySelector('[role=menuitem][active]');
    var newActive = listitems[newIdx];
    if (active)
      active.removeAttribute('active');
    newActive.setAttribute('active', '');
    menu.setAttribute('aria-activedescendant', newActive.id);
  }

  menu.addEventListener('keydown', handleKeyDown);
  menu.addEventListener('blur', closeMenu);
})()
