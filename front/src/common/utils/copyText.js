const copyText = async (elementId) => {
  const el = document.getElementById(elementId);
  const text = el.innerText;
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export default copyText;
