function convertKgToLbs() {
  const kg = parseFloat(document.getElementById("kgInput").value);
  const resultDisplay = document.getElementById("result");

  if (isNaN(kg)) {
    resultDisplay.textContent = "Please enter a valid number.";
    return;
  }

  const lbs = (kg * 2.20462).toFixed(2);
  resultDisplay.textContent = `${kg} kg = ${lbs} lbs`;
}