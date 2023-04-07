const verificationCode = document.querySelector("div[data-id='verification-code']");
const inputs = verificationCode.querySelectorAll("input[type='text']");
const isAlphanumeric = /\w/

const focusLeft = (index) => {
  const prevInput = inputs[index - 1];
  if (prevInput) setTimeout(() => prevInput.focus());
}

const focusRight = (index) => {
  const nextInput = inputs[index + 1];
  if (nextInput) setTimeout(() => nextInput.focus());
}

inputs.forEach((input, index) => {
  input.setAttribute("maxLength", 1);

  input.onkeydown = function(evt) {
    if (evt.key === "Tab" || evt.key === ' ') return;

    if (evt.key === "ArrowLeft") return focusLeft(index);
    if (evt.key === "ArrowRight") return focusRight(index);

    if (evt.key === "Backspace") {
      input.value = '';
      return focusLeft(index);
    }

    if (evt.key.length === 1 && isAlphanumeric.test(evt.key)) {
      input.value = evt.key;
      focusRight(index);
    }
  }

  input.onchange = function(evt) {
    evt.preventDefault();
    return null;
  }

  input.onfocus = function (evt) {
    evt.target.setSelectionRange(0, 1);
  }
});
