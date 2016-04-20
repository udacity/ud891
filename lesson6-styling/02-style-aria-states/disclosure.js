var button = document.querySelector('button');
var content = document.getElementById('content');

button.addEventListener('click', toggleDisclosure);
button.addEventListener('keydown', toggleDisclosure);

function toggleDisclosure(e) {
  var type = e.type;

  // If the key pressed was not Space or Enter, return
  if (type === 'keydown' && (event.keyCode !== 13 && event.keyCode !== 32)) {
    return true;
  }

  e.preventDefault();

  if (content.getAttribute('aria-hidden') === 'true') {

    content.setAttribute('aria-hidden', 'false');
    content.classList.remove('hidden');

    button.setAttribute('aria-expanded', 'true');
    button.classList.add('expanded');

  } else {

    content.setAttribute('aria-hidden', 'true');
    content.classList.add('hidden');

    button.setAttribute('aria-expanded', 'false');
    button.classList.remove('expanded');

  }
}
