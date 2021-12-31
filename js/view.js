export const UI_ELEMENTS = {
  CALCULATOR_OUTPUT: document.querySelector('.calculator-body__display'),
  DELETE_BUTTON: document.querySelector('.button-delete'),
  EQUAL_BUTTON: document.querySelector('.button-equal'),
  NUMBER_BUTTONS: document.querySelectorAll('.button-number'),
  OPERATION_BUTTONS: document.querySelectorAll('.button-operation'),
  CLEAR_BUTTON: document.querySelector('.button-clear'),
}

export function renderDisplay(visibleExpression) {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = visibleExpression;
  
  if ( visibleExpression.length >= 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '...' + visibleExpression.slice( -4 );
  }
}

export function init() {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '0';
};

export function renderClear() {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '0';
}

export function renderDelete(visibleExpression) {
  const isLastChar = UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().length === 1;

  if ( isLastChar ) {
    renderClear();
    return
  }

  if ( visibleExpression.length >= 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = '...' + visibleExpression.slice( -4 );
    return
  }

  if ( visibleExpression.length < 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = visibleExpression;
    return
  }
}

export function renderEqual(visibleExpression) {
  UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = visibleExpression;

  if ( visibleExpression >= 7 ) {
    UI_ELEMENTS.CALCULATOR_OUTPUT.textContent = visibleExpression.slice( 0, 4 ) + '...';
  }
}