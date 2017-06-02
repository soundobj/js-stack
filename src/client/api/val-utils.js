import Immutable from "immutable";
import _ from "lodash";

const isEmpty = val => (
  val === null ||
  val === undefined ||
  (Object.prototype.hasOwnProperty.call(val, "length") && val.length === 0) ||
  (val.constructor === Object && Object.keys(val).length === 0)
);

const normalizePath = (path) => {
  if (path.substr(-1) === ".") {
    path = path.substr(0, path.length - 1);
  }
  return path;
};

/**
 * Get a property from an object by path
 *
 * @method getValueByPath
 * @param {Object} obj object
 * @param {String} path dot notation path to property
 * @return {*|undefined} return value from object or undefined if not found
 */
const getValueByPath = (obj, path) => {
  const traverseObject = (obj, path) => { // eslint-disable-line consistent-return
    if (!path) {
      return obj;
    }

    const pathParts = normalizePath(path).split(".");
    let propertyValue = obj[pathParts[0]];

    if (propertyValue !== undefined) {
      if (pathParts.length > 1) {
        if (Immutable.Iterable.isIterable(propertyValue)) {
          propertyValue = propertyValue.toJS();
        }
        return traverseObject(propertyValue, pathParts.splice(1).join("."));
      }
      return propertyValue;
    }
  };

  if (obj) {
    return traverseObject(obj, path);
  }

  return undefined;
};

/**
 * converts an object { "a.b.c": "foo" } into
 * {
 *  a: {
 *    b: {
 *      c: "foo"
 *    }
 *  }
 * }
 * @param obj
 * @returns {{}}
 */
function marshalObject(obj) {
  const _obj = {};
  Object.keys(obj).map((key) => {
    _.set(_obj, key, obj[key]);
  });
  return _obj;
}

module.exports.isEmpty = isEmpty;
module.exports.getValueByPath = getValueByPath;
module.exports.marshalObject = marshalObject;