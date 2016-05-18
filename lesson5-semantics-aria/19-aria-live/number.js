var number = document.querySelector('#number');
function increment() {
  var oldValue = number.textContent;
  number.textContent = parseInt(oldValue, 10) + 10;
}

function decrement() {
  var oldValue = number.textContent;
  number.textContent = parseInt(oldValue, 10) - 10;
}

document.querySelector('#add').addEventListener('click', increment);
document.querySelector('#subtract').addEventListener('click', decrement);

var VK_UP         = 38;
var VK_DOWN       = 40;
var spinbutton = document.querySelector('[role=spinbutton]');
spinbutton.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
  case VK_UP:
    increment();
    e.stopPropagation();
    e.preventDefault();
    break;
  case VK_DOWN:
    decrement();
    e.stopPropagation();
    e.preventDefault();
    break;
  }
});
