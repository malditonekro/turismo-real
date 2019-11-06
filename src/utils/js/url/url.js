/**
 * URL utility class
 */
export default class UrlUtil {
  /**
   * getArgsFromQueryString
   * Return arguments from passed query string
   */
  static getArgsFromQueryString(queryString) {
    const args = {};
    if (!queryString || queryString.length === 0) {
      return args;
    }
    const queryStringParts = queryString.split('&');
    for (let i = 0; i < queryStringParts.length; i += 1) {
      const queryStringPartData = queryStringParts[i].split('=');
      if (queryStringPartData.length === 2) {
        let queryStringPartValue = queryStringPartData[1].split(',');
        if (queryStringPartValue.length === 1) {
          queryStringPartValue = [...queryStringPartValue, queryStringPartValue[0]];
        }
        if (queryStringPartValue
          && queryStringPartValue.toString() !== ''
          && queryStringPartValue.toString() !== 'undefined'
          && queryStringPartValue.toString() !== 'null') {
          args[queryStringPartData[0]] = queryStringPartValue;
        }
      }
    }
    return args;
  }

  /**
   * getArgsFromUrl
   * Return arguments from passed URL
   */
  static getArgsFromUrl(url) {
    let args = {};
    if (url.indexOf('?') > -1) {
      const queryString = url.split('?')[1];
      args = this.getArgsFromQueryString(queryString);
    }
    return args;
  }

  /**
   * getArgsFromLocation
   * Return arguments from current location
   */
  static getArgsFromLocation() {
    return this.getArgsFromUrl(window.location.href);
  }
}
