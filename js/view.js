export const UI_ELEMENTS = {
  CALCULATOR_OUTPUT: document.querySelector('.calculator-body__display'),
  DELETE_BUTTON: document.querySelector('.button-delete'),
  EQUAL_BUTTON: document.querySelector('.button-equal'),
  NUMBER_BUTTONS: document.querySelectorAll('.button-number'),
  OPERATION_BUTTONS: document.querySelectorAll('.button-operation'),
  CLEAR_BUTTON: document.querySelector('.button-clear'),
}

export function renderDisplay(text) {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = text;

  const displayLength = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().length;
  if ( displayLength >= 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '...' + UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.slice(-4);
  }
}

export function init() {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '0';
};

export function renderClear() {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '0';
}

export function renderDelete() {
  const isLastChar = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().length === 1;

  if ( isLastChar ) {
    renderClear();
    return
  }

  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.slice(0, -1);
}

export function renderEqual(expressionResult) {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = expressionResult;

  const displayLength = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().length;
  if ( displayLength >= 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.slice(0, 4) + '...';
  }
}