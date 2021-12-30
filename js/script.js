'use strict';

import { UI_ELEMENTS, renderDisplay, init, renderClear, renderDelete, renderEqual } from './view.js';
import { parseExpressionString } from './parsers.js';

export const PRIORITIES = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '*': 2,
  '/': 2,
};

export function Calc(operator, arg1, arg2) {
  const listOfAvailableOperators = {
    '+': +arg1 + +arg2,
    '-': arg1 - arg2,
    '×': arg1 * arg2,
    '÷': arg1 / arg2,
    '*': arg1 * arg2,
    '/': arg1 / arg2,
  };

  const isNotValid = !isFinite( listOfAvailableOperators[operator] );

  if ( isNotValid ) {
    throw new Error('Unexpected Infinity value')
  }

  return listOfAvailableOperators[operator]
}

const AVAILABLE_OPERATORS = ['+', '-', '×', '÷'];

let expression = '';

let isOperatorNotOneInARow = false;

init();

UI_ELEMENTS.NUMBER_BUTTONS.forEach(button => {
  button.addEventListener('click', buttonValue => {
    const buttonValueText = buttonValue.target.textContent.trim();
    expression += buttonValueText;
    renderDisplay( expression );
    isOperatorNotOneInARow = false;
  });
});

UI_ELEMENTS.OPERATION_BUTTONS.forEach(button => {
  button.addEventListener('click', buttonValue => {
    const buttonValueText = buttonValue.target.textContent.trim();

    if ( isOperatorNotOneInARow ) {
      renderDelete();
      expression = expression.slice(0, -1) + buttonValueText;
      renderDisplay( expression );
      return
    }

    expression += buttonValueText;
    renderDisplay( outputTextNotCleared );
    isOperatorNotOneInARow = true;
  });
});

UI_ELEMENTS.EQUAL_BUTTON.addEventListener('click', () => {
  expression = parseExpressionString( expression );
  renderEqual( expression );
  isOperatorNotOneInARow = false;
});

UI_ELEMENTS.CLEAR_BUTTON.addEventListener('click', () => {
  renderClear();
  expression = '';
  isOperatorNotOneInARow = false;
});

UI_ELEMENTS.DELETE_BUTTON.addEventListener('click', () => {
  renderDelete();
  expression = expression.slice(0, -1);
  isOperatorNotOneInARow = false;

  const isOperatorLastChar = AVAILABLE_OPERATORS.includes(UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().slice(-1));

  if ( isOperatorLastChar ) {
    isOperatorNotOneInARow = true;
  };
});