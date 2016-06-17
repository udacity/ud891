function ShoppingBag(bag, count) {
  this._el = bag;
  this._el.setAttribute('data-count', count);
  var itemPhrase = count === 1 ? `${count} item` : `${count} items`;
  this._el.setAttribute('aria-label', `${itemPhrase} in cart`);
}

var shoppingBags = document.querySelectorAll('.shopping-bag');
for (var i = 0; i < shoppingBags.length; i++) {
  // We'll fake the number of items that the user has by passing in 2
  // In a real app this would probably come from some user data in the backend
  new ShoppingBag(shoppingBags[i], 2);
}
