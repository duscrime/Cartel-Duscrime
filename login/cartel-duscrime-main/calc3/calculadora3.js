let currentInput = '';
let operation = '';
let previousTime = null;

function appendNumber(number) {
  if (currentInput.replace(':', '').length >= 4) return; 
  currentInput += number;
  formatInputAsTime();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  formatInputAsTime();
}

function clearInput() {
  currentInput = '';
  previousTime = null;
  operation = '';
  updateDisplay('');
}

function setOperation(op) {
  const formattedTime = formatInputAsTime(false);
  if (validateTime(formattedTime)) {
    previousTime = formattedTime;
    operation = op;
    currentInput = '';
    updateDisplay('');
  } else {
    alert('Insira uma hora válida primeiro.');
  }
}

function calculate() {
  const formattedTime = formatInputAsTime(false);

  if (previousTime && formattedTime && validateTime(formattedTime)) {
    const [prevHours, prevMinutes] = previousTime.split(':').map(Number);
    const [currHours, currMinutes] = formattedTime.split(':').map(Number);

    let totalHours, totalMinutes;

    if (operation === '+') {
      totalMinutes = prevMinutes + currMinutes;
      totalHours = prevHours + currHours + Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }

    const result = `${formatTime(totalHours)}:${formatTime(totalMinutes)}`;
    updateDisplay(result);
    addToHistory(`${previousTime} ${operation} ${formattedTime} = ${result}`);
  } else {
    alert('Operação inválida ou dados incompletos.');
  }
}

function formatInputAsTime(updateDisplayNow = true) {
  let formattedTime = '';
  const cleanInput = currentInput.replace(':', '');

  if (cleanInput.length === 1) {
    formattedTime = `0${cleanInput}:`;
  } else if (cleanInput.length === 2) {
    formattedTime = `${cleanInput}:`;
  } else if (cleanInput.length === 3) {
    formattedTime = `${cleanInput.slice(0, 2)}:${cleanInput.slice(2, 3)}0`;
  } else if (cleanInput.length === 4) {
    formattedTime = `${cleanInput.slice(0, 2)}:${cleanInput.slice(2, 4)}`;
  }

  if (updateDisplayNow) updateDisplay(formattedTime);
  return formattedTime;
}

function updateDisplay(value) {
  document.getElementById('result').value = value;
}

function validateTime(time) {
  const parts = time.split(':');
  if (parts.length !== 2) return false;
  const [hours, minutes] = parts.map(Number);
  return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function formatTime(value) {
  return value.toString().padStart(2, '0');
}

function addToHistory(entry) {
  const historyDiv = document.getElementById('history');
  const newEntry = document.createElement('div');
  newEntry.textContent = entry;
  historyDiv.prepend(newEntry);
}
