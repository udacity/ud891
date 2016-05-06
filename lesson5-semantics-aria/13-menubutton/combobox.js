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

    var LAST_ID = 0;

    /**
     * Generate a unique DOM ID.
     * @return {string}
     */
    function nextId() {
        var id = ':' + LAST_ID;
        LAST_ID++;
        return id;
    }

    /**
     * @constructor
     * Implements the 'menu button' pattern: https://www.w3.org/TR/wai-aria-practices/#menubutton
     * @param {Element} buttonEl The button element to decorate
     * @param {Element} menuEl The menu element to associate with this menu button; also decorates
     *     it with the `Menu` class.
     */
    function ComboBox(el, listEl) {
        this.el = el;
        this.listbox = new ListBox(listEl, this);
        listEl.id = nextId();
        el.setAttribute('aria-owns', listEl.id);

        this.el.addEventListener('focus', this.handleFocus.bind(this));
        this.el.addEventListener('blur', this.handleBlur.bind(this));
        this.el.addEventListener('input', this.handleInput.bind(this));
        this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    ComboBox.prototype = {
        set value(val) {
            this.el.value = val;
        },

        handleFocus: function(e) {
            this.listbox.show();
        },

        handleBlur: function(e) {
            this.listbox.hide();
            this.el.removeAttribute('aria-activedescendant');
        },

        handleInput: function(e) {
            this.listbox.show();
            this.listbox.filter(this.el.value);
        },

        handleKeyDown: function(e) {
            switch (e.keyCode) {
            case VK_DOWN:
                if (!this.listbox.hidden) {
                    this.listbox.nextActiveListItem();
                }
                break;
            case VK_UP:
                if (!this.listbox.hidden) {
                    this.listbox.previousActiveListItem();
                }
                break;
            case VK_ENTER:
                var active = this.listbox.activeItem;
                if (!active)
                    break;
                this.value = active.textContent;
                this.listbox.hide();
                break;
            case VK_ESC:
                this.listbox.hide();
                break;
            }

            return;
        },


        setActiveDescendant: function(el) {
            this.el.setAttribute('aria-activedescendant', el.id);
        }
    };

    /**
     * @constructor
     * Implements the 'menu' pattern: https://www.w3.org/TR/wai-aria-practices/#menu
     * @param {Element} el The element to decorate with the menu pattern.
     * @param {PopUpButton} button The button which controls this menu.
     */
    function ListBox(el, textbox) {
        this.el = el;
        this.textbox = textbox;
        this.items = Array.prototype.slice.call(el.querySelectorAll('[role=option]'));
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item.id = nextId();

            item.addEventListener('mouseover', this.handleHoverOnItem.bind(this));
            item.addEventListener('click', this.handleClickOnItem.bind(this));
        }

        this.visibleItems = this.items.slice();

        el.addEventListener('keydown', this.handleKeyDown.bind(this));
        el.addEventListener('blur', this.handleBlur.bind(this));
    }


    ListBox.prototype = {
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
            return this.el.querySelector('[role=option].active');
        },

        filter: function(str) {
            this.visibleItems = [];
            var foundItems = 0;
            for (var item of this.items) {
                if (item.textContent.toLowerCase().startsWith(str.toLowerCase())) {
                    foundItems++;
                    item.hidden = false;
                    item.setAttribute('aria-posinset', foundItems);
                    this.visibleItems.push(item);
                } else {
                    item.hidden = true;
                    item.removeAttribute('aria-posinset');
                    item.classList.remove('active');
                }
            }
            if (foundItems === 0) {
                this.hide();
            } else {
                for (var item of this.visibleItems) {
                    item.setAttribute('aria-setsize', foundItems);
                }
            }
        },

        show: function() {
            if (!this.hidden)
                return;

            this.el.removeAttribute('hidden');
        },

        hide: function() {
            if (this.hidden)
                return;

            if (this.activeItem)
                this.activeItem.classList.remove('active');
            this.el.removeAttribute('aria-activedescendant');
            this.el.setAttribute('hidden', '');
        },

        selectItem: function(item) {
            var selected = this.el.querySelector('[aria-selected]');
            if (selected && selected != item)
                selected.removeAttribute('aria-selected');
            item.setAttribute('aria-selected', true);

            this.button.value = item.textContent;
            this.hide();
        },

        handleBlur(e) {
            this.hide();
        },

        handleKeyDown: function (e) {
            var active = this.activeItem;
            var activeIdx = -1;
            if (active)
                activeIdx = this.items.indexOf(active);

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

        nextActiveListItem: function() {
            var active = this.activeItem;
            var activeIdx = -1;
            if (active)
                activeIdx = this.visibleItems.indexOf(active);

            var newIdx = activeIdx;
            newIdx = (newIdx + 1) % this.visibleItems.length;
            this.changeActiveListitem(newIdx);
        },

        previousActiveListItem: function() {
            var active = this.activeItem;
            var activeIdx = -1;
            if (active)
                activeIdx = this.visibleItems.indexOf(active);

            var newIdx = activeIdx;
            newIdx--;
            if (newIdx < 0)
                newIdx += this.visibleItems.length;

            this.changeActiveListitem(newIdx);
        },

        changeActiveListitem: function(newIdx) {
            var active = this.activeItem;
            var newActive = this.visibleItems[newIdx];
            if (active)
                active.classList.remove('active');
            newActive.classList.add('active');

            this.textbox.setActiveDescendant(newActive);
        }
    };

    var input = document.querySelector('input[type=text]');
    var listbox = document.querySelector('[role=listbox]');

    new ComboBox(input, listbox);
})()
