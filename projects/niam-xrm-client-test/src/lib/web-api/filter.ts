import { Entity, WebApiOption } from '../definitions';

// https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/webapi/query-data-web-api
export enum operator {
  eq, //$filter=revenue eq 100000
  ne, //$filter=revenue ne 100000
  gt, //$filter=revenue gt 100000
  ge, //$filter=revenue ge 100000
  lt, //$filter=revenue lt 100000
  le, //$filter=revenue le 100000
  contains, //$filter=contains(name,'(sample)')
  endswith, //$filter=endswith(name,'Inc.')
  startswith, //$filter=startswith(name,'a')
}

export enum logicalOperator {
  and,
  or,
  not,
}

export interface hierarchyFilterType {
  attributeName: string;
  operator: operator;
  value: string;
  logicalOperator?: logicalOperator;
  not?: boolean;
  filterTypes: hierarchyFilterType[];
}

export interface filterType {
  attributeName: string;
  operator: operator;
  value: string;
  logicalOperator?: logicalOperator;
  not?: boolean;
  bracketOpenCt: number;
  bracketCloseCt: number;
  totalBracket?: number;
}

export function parseValue(value: any) {
  if (value === null || value === undefined) return value;

  if (Number(value)) {
    return Number(value);
  }

  const boolValue = value as boolean;
  if (boolValue) {
    return boolValue;
  }

  const stringValue = value as string;
  let date = new Date(stringValue);

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }

  return stringValue;
}

function isValid(
  entity: Entity,
  command: hierarchyFilterType,
  parentCommand: hierarchyFilterType = null,
  parentResult: boolean = null
): boolean {
  if (!command) return false;

  const value = parseValue(entity[command.attributeName]);
  const compareValue = parseValue(command.value);
  let valid = false;
  if (command.operator === operator.contains) {
    valid = value.indexOf(compareValue) > -1;
  } else if (command.operator === operator.startswith) {
    valid = value.startWith(compareValue);
  } else if (command.operator === operator.endswith) {
    valid = value.endsWith(compareValue);
  } else if (command.operator === operator.eq) {
    valid = value === compareValue;
  } else if (command.operator === operator.ge) {
    valid = value >= compareValue;
  } else if (command.operator === operator.gt) {
    valid = value > compareValue;
  } else if (command.operator === operator.le) {
    valid = value <= compareValue;
  } else if (command.operator === operator.lt) {
    valid = value < compareValue;
  } else if (command.operator === operator.ne) {
    valid = value != compareValue;
  }

  if (command.not) {
    valid = !valid;
  }

  if (command.filterTypes.length > 0) {
    for (var childCommand of command.filterTypes) {
      valid = isValid(entity, childCommand, command, valid);
    }
  }

  valid =
    parentCommand != null
      ? (parentCommand.logicalOperator || command.logicalOperator) ===
        logicalOperator.and
        ? parentResult && valid
        : parentResult || valid
      : valid;
  return valid;
}

export function filter(entities: Entity[], webOption: WebApiOption): Entity[] {
  const resultEntities: Entity[] = [];
  const valid =
    entities && entities.length > 0 && webOption && webOption.filter !== '';
  if (!valid) return resultEntities;

  const commands = getHierarchyCommands(webOption.filter);
  for (const entity of entities) {
    let result = true;
    let lastLogicalOperator: logicalOperator = null;
    for (const command of commands) {
      if (!lastLogicalOperator && !command.logicalOperator) {
        lastLogicalOperator = command.logicalOperator;
      }

      const temp = isValid(entity, command);
      result =
        lastLogicalOperator != null
          ? lastLogicalOperator === logicalOperator.and
            ? result && temp
            : result || temp
          : temp;
      lastLogicalOperator = command.logicalOperator;
      if (!result) break;
    }

    if (result) {
      resultEntities.push(entity);
    }
  }

  return resultEntities;
}

function setRefrentialCommands(
  result: hierarchyFilterType[],
  currentCommand: filterType,
  commands: filterType[],
  parentHierarchy: hierarchyFilterType = null
): hierarchyFilterType[] {
  const currentHierarchy: hierarchyFilterType = {
    attributeName: currentCommand.attributeName,
    operator: currentCommand.operator,
    value: currentCommand.value,
    filterTypes: [],
    logicalOperator: currentCommand.logicalOperator,
    not: currentCommand.not,
  };
  if (parentHierarchy) {
    parentHierarchy.filterTypes = parentHierarchy.filterTypes.concat(
      currentHierarchy
    );
  } else if (
    commands.length > 0 &&
    currentCommand.bracketOpenCt != currentCommand.bracketCloseCt
  ) {
    do {
      var command = commands.shift();
      if (!command) {
        return;
      }
      setRefrentialCommands(result, command, commands, currentHierarchy);

      currentCommand.bracketOpenCt += command.bracketOpenCt;
      currentCommand.bracketCloseCt += command.bracketCloseCt;
    } while (currentCommand.bracketOpenCt != currentCommand.bracketCloseCt);

    result.push(currentHierarchy);
  } else {
    result.push(currentHierarchy);
  }
}

export function getHierarchyCommands(query: string): hierarchyFilterType[] {
  const commands = getCommands(query);
  if (commands.length === 0) return null;
  const result: hierarchyFilterType[] = [];
  do {
    const currentCommand = commands.shift();
    setRefrentialCommands(result, currentCommand, commands);
  } while (commands.length > 0);
  return result;
}

function getValueWithoutBracket(value: string, isHaveQuoteChar: boolean) {
  if (isHaveQuoteChar) {
    const bracketChar = value[0];
    let bracketCloseIndex = -1;
    for (let i = value.length; i >= 0; i--) {
      const letter = value[i];
      if (letter === bracketChar) {
        bracketCloseIndex = i;
        break;
      }
    }

    return value.substring(0, bracketCloseIndex);
  }

  let closeBracketCounter = 0;
  let lastLetter = '';
  for (let i = value.length; i >= 0; i--) {
    const letter = value[i - 1];
    if (letter === ')') {
      closeBracketCounter++;
    }
    lastLetter = letter;
    if (lastLetter !== ')') break;
  }

  return closeBracketCounter === 0
    ? value
    : value.substring(0, value.length - closeBracketCounter);
}

export function parsingValue(value: string) {
  const isHaveQuoteChar = value.startsWith("'") || value.startsWith('"');
  const valueWithoutBracket = getValueWithoutBracket(value, isHaveQuoteChar);
  const from = isHaveQuoteChar ? 1 : 0;
  const to =
    valueWithoutBracket.endsWith("'") || valueWithoutBracket.endsWith('"')
      ? valueWithoutBracket.length - 1
      : valueWithoutBracket.length;
  let result = value.substring(from, to);
  mappingLogicalOperators.forEach(
    (e) => (result = result.replace(e.replaceWord, e.word))
  );

  return {
    text: result,
    closeBracketCount: value.length - result.length,
  };
}

export type logicalType = { text: string; logicalOperator?: logicalOperator };
const mappingLogicalOperators = [
  {
    word: ' and ',
    replaceWord: ' _&_&_ ',
  },
  {
    word: ' or ',
    replaceWord: ' _|_|_ ',
  },
];

export function transformText(value: string): string {
  const quoteChars = ['"', "'"];
  let tempText = value;

  const valid = quoteChars.some((e) => tempText.indexOf(e) > -1);
  if (!valid) return tempText;

  var quotePositions: number[] = [];
  for (let i = 0; i < tempText.length; i++) {
    const letter = tempText[i];
    if (!quoteChars.some((e) => letter === e)) continue;
    quotePositions.push(i);
  }

  for (var i = 0; i < quotePositions.length - 1; i++) {
    const beginIndex = quotePositions[i];
    const endIndex = quotePositions[i + 1];
    const checkText = tempText.substring(beginIndex, endIndex);

    mappingLogicalOperators.forEach((map) => {
      const replaceText = checkText.replace(map.word, map.replaceWord);
      tempText = tempText.replace(checkText, replaceText);
    });
  }

  return tempText;
}

export function getCommands(query: string): filterType[] {
  query = transformText(query);
  const result: filterType[] = [];

  const commonOperators = [' eq ', ' ne ', ' gt ', ' ge ', ' lt ', ' le '];
  const specialOperators = ['contains(', 'endswith(', 'startswith('];

  let logicalTypes: logicalType[] = [];
  const logicalOperators = ['and', 'or'];

  const words = query.split(' ');
  let lastLogicalOperator: logicalOperator = null;
  let lastIndexWord = 0;
  for (let i = 0; i < words.length; i++) {
    if (i == words.length - 1) {
      logicalTypes.push({
        text: words.slice(lastIndexWord, i + 1).join(' '),
        logicalOperator: lastLogicalOperator,
      });
      break;
    }

    const word = words[i];
    if (logicalOperators.indexOf(word) === -1) continue;

    logicalTypes.push({
      text: words.slice(lastIndexWord, i).join(' '),
      logicalOperator: lastLogicalOperator,
    });

    lastLogicalOperator =
      word === 'and' ? logicalOperator.and : logicalOperator.or;
    lastIndexWord = i + 1;
  }

  for (const datum of logicalTypes) {
    for (const specialStr of specialOperators) {
      if (datum.text.indexOf(specialStr) === -1) continue;

      const operatorType =
        specialStr.trim().indexOf('contains(') > -1
          ? operator.contains
          : specialStr.trim().indexOf('endswith(') > -1
          ? operator.endswith
          : operator.startswith;

      var isNot = datum.text.startsWith('not ');

      let logicalTextCommand = isNot
        ? datum.text.substring(4, datum.text.length)
        : datum.text;
      logicalTextCommand = logicalTextCommand
        .substring(0, logicalTextCommand.length - 1)
        .replace(specialStr, '');

      const data = logicalTextCommand.split(',').map((e) => e.trim());
      const attributeData = getAttributeData(data.shift());

      datum.text = '';
      const specialValue = parsingValue(data.join(','));
      const filter: filterType = {
        attributeName: attributeData.attributeName,
        operator: operatorType,
        value: specialValue.text,
        logicalOperator: datum.logicalOperator,
        not: isNot,
        bracketOpenCt: attributeData.bracketOpenCt,
        bracketCloseCt: specialValue.closeBracketCount,
      };

      result.push(filter);
    }

    if (datum.text === '') continue;

    for (const operatorStr of commonOperators) {
      if (datum.text.indexOf(operatorStr) === -1) continue;

      const data = datum.text.split(operatorStr);
      const operatorType =
        operatorStr.trim() === 'eq'
          ? operator.eq
          : operatorStr.trim() === 'ne'
          ? operator.ne
          : operatorStr.trim() === 'gt'
          ? operator.gt
          : operatorStr.trim() === 'ge'
          ? operator.ge
          : operatorStr.trim() === 'lt'
          ? operator.lt
          : operator.le;
      const attributeData = getAttributeData(data[0]);
      const commonData = parsingValue(data[1]);
      const filter: filterType = {
        attributeName: attributeData.attributeName,
        operator: operatorType,
        value: commonData.text,
        logicalOperator: datum.logicalOperator,
        bracketOpenCt: attributeData.bracketOpenCt,
        bracketCloseCt: commonData.closeBracketCount,
      };

      result.push(setIsNot(filter));
    }
  }

  return result;
}

function getAttributeData(
  attributeName: string
): { attributeName: string; bracketOpenCt: number } {
  if (!attributeName.startsWith('('))
    return { bracketOpenCt: 0, attributeName: attributeName };

  let found = 0;
  let lastLetter = '';
  for (const letter of attributeName) {
    lastLetter = letter;
    if (letter === '(') {
      found++;
    }
    if (lastLetter !== '(') {
      break;
    }
  }

  return {
    bracketOpenCt: found,
    attributeName: attributeName.substring(found, attributeName.length),
  };
}

function setIsNot(filterType: filterType): filterType {
  const isNot = filterType.attributeName.indexOf('not ') > -1;
  return {
    attributeName: isNot
      ? filterType.attributeName.replace('not ', '')
      : filterType.attributeName,
    operator: filterType.operator,
    value: filterType.value,
    logicalOperator: filterType.logicalOperator,
    not: isNot,
    bracketCloseCt: filterType.bracketCloseCt,
    bracketOpenCt: filterType.bracketOpenCt,
  };
}
