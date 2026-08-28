const unitData = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  mass: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    metric_ton: 1000
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    cubic_meter: 1000,
    gallon_us: 3.78541,
    quart_us: 0.946353,
    pint_us: 0.473176,
    cup_us: 0.24
  },
  digital: {
    byte: 1,
    kilobyte: 1024,
    megabyte: 1048576,
    gigabyte: 1073741824,
    terabyte: 1099511627776
  },
  temperature: {
    celsius: "celsius",
    fahrenheit: "fahrenheit",
    kelvin: "kelvin"
  }
};

function populateSelectOptions(selectElement, units) {
  selectElement.innerHTML = '';
  for (const key in units) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    selectElement.appendChild(option);
  }
}

function updateUnits() {
  const category = document.getElementById('category').value;
  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');
  const units = unitData[category];

  populateSelectOptions(fromSelect, units);
  populateSelectOptions(toSelect, units);

  // Default selection offset for contrast
  const keys = Object.keys(units);
  if (keys.length > 1) {
    toSelect.selectedIndex = 1;
  }

  convert();
}

function convert() {
  const category = document.getElementById('category').value;
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const fromVal = parseFloat(document.getElementById('fromValue').value);
  const toInput = document.getElementById('toValue');

  if (isNaN(fromVal)) {
    toInput.value = '';
    return;
  }

  let result = 0;

  if (category === 'temperature') {
    result = convertTemperature(fromVal, fromUnit, toUnit);
  } else {
    const baseValue = fromVal * unitData[category][fromUnit];
    result = baseValue / unitData[category][toUnit];
  }

  toInput.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(6));
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius = 0;

  // Convert input to Celsius baseline
  if (from === 'celsius') celsius = value;
  else if (from === 'fahrenheit') celsius = (value - 32) * (5 / 9);
  else if (from === 'kelvin') celsius = value - 273.15;

  // Convert Celsius baseline to output target
  if (to === 'celsius') return celsius;
  if (to === 'fahrenheit') return (celsius * (9 / 5)) + 32;
  if (to === 'kelvin') return celsius + 273.15;
}

function swapUnits() {
  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');
  
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  
  convert();
}

// Initialize default view on launch
window.onload = updateUnits;