var checkbox = document.querySelector('input#jLetter');
var parent = checkbox.parentElement;
var labelText = parent.textContent.trim();

function observe(records, self) {
  if (!checkbox || !parent) {
    console.error('You deleted the element you were supposed to label! Maybe refresh the page and try again...');
    return;
  }

  if (!checkbox.labels)
    return;

  for (var i = 0; i < checkbox.labels.length; i++) {
    var label = checkbox.labels[i];
    if (label.textContent.trim() != labelText)
      continue;

    document.querySelector('.secret').textContent = 'The secret word is: "BILBY"'
    document.querySelector('.header').classList.add('success');
  }

}
var observer = new MutationObserver(observe);
observer.observe(parent, { childList: true, subtree: true });
