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
    throw new Error( 'Unexpected Infinity value' )
  }

  return listOfAvailableOperators[operator]
}

const AVAILABLE_OPERATORS = ['+', '-', '×', '÷'];

let expression = '';

let isOperatorNotOneInARow = false;

init();

UI_ELEMENTS.NUMBER_BUTTONS.forEach(button => {
  button.addEventListener('click', handleNumber( button ));
});

UI_ELEMENTS.OPERATION_BUTTONS.forEach(button => {
  button.addEventListener('click', handleOperator( button ));
});

UI_ELEMENTS.EQUAL_BUTTON.addEventListener('click', calculateExpression);

UI_ELEMENTS.CLEAR_BUTTON.addEventListener('click', clearAll);

UI_ELEMENTS.DELETE_BUTTON.addEventListener('click', deleteLastChar);

function deleteLastChar() {
  expression = expression.slice( 0, -1 );
  renderDelete( expression );
  isOperatorNotOneInARow = false;

  const isOperatorLastChar = AVAILABLE_OPERATORS.includes(UI_ELEMENTS.CALCULATOR_OUTPUT.textContent.trim().slice( -1 ));
  
  if ( isOperatorLastChar ) {
    isOperatorNotOneInARow = true;
  };
};

function clearAll() {
  renderClear();
  expression = '';
  isOperatorNotOneInARow = false;
}

function calculateExpression() {
  expression = String(parseExpressionString( expression ));
  renderEqual( expression );
  isOperatorNotOneInARow = false;
}

function handleOperator(operatorElement) {
  const buttonValue = operatorElement.textContent.trim();

  return function() {
    if ( isOperatorNotOneInARow ) {
      expression = expression.slice( 0, -1 ) + buttonValue;
      renderDelete( expression );
      renderDisplay( expression );
      return
    }
  
    expression += buttonValue;
    renderDisplay( expression );
    isOperatorNotOneInARow = true;
  }
}

function handleNumber(numberElement) {
  const buttonValue = numberElement.textContent.trim();

  return function() {
    expression += buttonValue;
    renderDisplay( expression );
    isOperatorNotOneInARow = false;
  }
}