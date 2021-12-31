import { clearSpacesFromString } from './helpers.js';
import { Calc, PRIORITIES } from './script.js';

export function parseExpressionString(expression) {
  const numbersList = [];
  const operatorsList = [];

  const expList = parseMultiDigitExpressionToArray(expression);
  expList.forEach(symbolCheck => {
    const isNum = typeof +symbolCheck === 'number' && !isNaN( +symbolCheck );

    if ( isNum ) {
      numbersList.push( +symbolCheck );
      return
    }

    const currentPriority = getOperatorPriority( symbolCheck );
    const prevPriority = getOperatorPriority( operatorsList[operatorsList.length - 1] );
    const checkOperatorPriority = currentPriority > prevPriority || operatorsList.length === 0;

    if ( checkOperatorPriority ) {
      operatorsList.push( symbolCheck );
    } else {
      const resultByLastNums = Calc( operatorsList[operatorsList.length - 1], numbersList[numbersList.length - 2], numbersList[numbersList.length - 1] );
      operatorsList.pop();
      numbersList.pop();
      numbersList[numbersList.length - 1] = resultByLastNums;
      operatorsList.push( symbolCheck );
    }
  });

  operatorsList.reverse().forEach(operator => {
    const resultByLastNums = Calc( operator, numbersList[numbersList.length - 2], numbersList[numbersList.length - 1] );
    numbersList.pop();
    numbersList[numbersList.length - 1] = resultByLastNums;
  });

  return numbersList[numbersList.length - 1];
}

function parseMultiDigitExpressionToArray(string) {
  const parsedList = [];
  const charList = clearSpacesFromString( string ).split('');
  let fullNumber = ''; 

  charList.forEach((char, i) => {
    const isLastChar = (string.length - 1) === i;
    const isNum = typeof +char === 'number' &&
                  !isNaN( +char );
    const isMultiNum = fullNumber.length === 0;
    const isDecimalSeparator = char === '.';

    if ( isNum ||
         isDecimalSeparator ) {
      if ( isLastChar ) {
        fullNumber += char;
        parsedList.push( fullNumber );
        return
      }

      if ( !isMultiNum ) {
        fullNumber += char;
        return
      }

      fullNumber = char;
      return
    }

    parsedList.push( fullNumber );
    parsedList.push( char );
    fullNumber = '';
  });

  return parsedList
}

function getOperatorPriority(operator) {
  return PRIORITIES[operator]
}