import { WebApiOption } from '../definitions/web-api-option';

// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrievemultiplerecords
// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/retrieverecord
export function getWebApiOption(option?: string): WebApiOption {
  if (!option) return {} as WebApiOption;

  if (option[0] !== '?') {
    throw Error("'?' not found in the first parameter");
  }
  option = option.replace('?', '');

  const result = option
    .split('&')
    .filter((e) => e)
    .reduce((webApiOption, attribute) => {
      const firstEqualIndex = attribute.indexOf('=');
      const key = attribute.substr(0, firstEqualIndex);
      const value = attribute.substr(firstEqualIndex + 1, attribute.length - 1);
      switch (key) {
        case '$select':
          webApiOption.select = value;
          break;
        case '$filter':
          webApiOption.filter = value;
          break;
        case '$expand':
          webApiOption.expand = value;
          break;
        case '$orderby':
          webApiOption.orderby = value;
          break;
        case '$top':
          webApiOption.top = value;
          break;
        default:
          throw Error(`WebApi with key '${key}' not supported`);
      }

      return webApiOption;
    }, {} as WebApiOption);

  return result;
}
