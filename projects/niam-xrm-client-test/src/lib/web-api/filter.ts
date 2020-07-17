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

export interface filterType {
  attributeName: string;
  operator: operator;
  value: string;
  logicalOperator?: logicalOperator;
  not?: boolean;
  filterTypes?: filterType[];
}

export function filter(entities: Entity[], webOption: WebApiOption): Entity[] {
  const valid =
    entities && entities.length > 0 && webOption && webOption.filter !== '';
  if (!valid) return [];
}

export function parsingValue(value: string): string {
  const from = value.startsWith("'") || value.startsWith('"') ? 1 : 0;
  const to =
    value.endsWith("'") || value.endsWith('"')
      ? value.length - 1
      : value.length;
  const result = value.substring(from, to);

  return result;
}

export type logicalType = { text: string; logicalOperator?: logicalOperator };

export function getCommands(value: string): filterType[] {
  const result: filterType[] = [];
  const logicalOperators = [' and ', ' or '];

  const commonOperators = [' eq ', ' ne ', ' gt ', ' ge ', ' lt ', ' le '];
  const specialOperators = ['contains(', 'endswith(', 'startswith('];
  let tempText = value;

  let logicalTypes: logicalType[] = [];
  for (const logicalOperatorStr of logicalOperators) {
    if (tempText.indexOf(logicalOperatorStr) === -1) continue;
    const logicalOperatorType =
      logicalOperatorStr.trim() === 'and'
        ? logicalOperator.and
        : logicalOperator.or;

    logicalTypes = logicalTypes.concat(
      tempText
        .split(logicalOperatorStr)
        .filter((e) => e.trim())
        .map((e) => {
          return {
            text: e.trim(),
            logicalOperator: logicalOperatorType,
          };
        })
    );

    tempText = removeOccurrence(
      tempText,
      logicalOperatorStr,
      logicalTypes.map((e) => e.text)
    );
  }

  if (logicalTypes.length === 0) {
    logicalTypes.push({
      text: tempText,
    });
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
      const attributeName = data.shift();

      datum.text = '';

      const filter: filterType = {
        attributeName: attributeName,
        operator: operatorType,
        value: parsingValue(data.join(',')),
        logicalOperator: datum.logicalOperator,
        not: isNot
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
      const attributeName = data[0];
      const filter: filterType = {
        attributeName: attributeName,
        operator: operatorType,
        value: parsingValue(data[1]),
        logicalOperator: datum.logicalOperator,
      };

      result.push(setIsNot(filter));
    }
  }

  return result;
}

function removeOccurrence(
  text: string,
  logicalOperatorStr: string,
  existTextes: string[]
) {
  text = text.split(logicalOperatorStr).join('').trim();
  for (const temp of existTextes) {
    text = text.split(temp).join('').trim();
  }

  return text.trim();
}

function setIsNot(filterType: filterType): filterType {
  const isNot = filterType.attributeName.startsWith('not ');
  return {
    attributeName: isNot
      ? filterType.attributeName.replace('not ', '')
      : filterType.attributeName,
    operator: filterType.operator,
    value: filterType.value,
    filterTypes: filterType.filterTypes,
    logicalOperator: filterType.logicalOperator,
    not: isNot,
  };
}
