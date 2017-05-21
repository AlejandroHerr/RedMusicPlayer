const lowerFirstLetter = (str) => str.charAt(0).toLowerCase() + str.slice(1);
export const toLowerCamelCase = (str) => lowerFirstLetter(str)
  .replace(/[ _-](.)/g, (match, group1) => group1.toUpperCase());

export const parseResponse = (response) => {
  const results = [];
  let obj = {};
  response.split('\n')
    .forEach((p) => {
      if (p.length === 0) { return; }
      const keyValue = p.match(/([^ ]+): (.*)/);
      if (keyValue === null) { throw new Error(`Could not parse entry ${p}`); }
      const key = toLowerCamelCase(keyValue[1]);
      const value = keyValue[2];
      if (obj.hasOwnProperty(key)) {
        results.push(obj);
        obj = {};
        obj[key] = value;
      }
      else { obj[key] = value; }
    });
  if (results.length === 0) {
    return obj;
  }
  results.push(obj);

  return results;
};

export const getTypes = (types) => {
  let [successType, errorType] = types;

  if (typeof successType === 'string') {
    successType = { type: successType };
  }
  successType = {
    payload: (res) => res,
    ...successType,
  };
  if (typeof errorType === 'string') {
    errorType = { type: errorType };
  }
  errorType = {
    payload: (err) => err,
    ...errorType,
  };

  return [successType, errorType];
};
