import Immutable from "immutable";

/**
 * @method updateObjectListByProperty
 * Data Structure Immutable.Map(listKey: Immutable.List())
 * @param {Immutable.map} state the store
 * @param {String} key store key where to find the items to update
 * @param {Array} list list of items to update
 * @param {String} property property to update
 * @returns {Set<T>|Stack<T>|Map<K, V>|List<T>|Cursor|*}
 */
function updateObjectListByProperty(state, key, list, property = "id") {
  return state.withMutations((map) => {
    map.update(key, (items) => {
      // Update a item if currently in the store or append if not:
      if (list && list.length) {
        list.map((item) => {
          const index = items.findIndex((storeItem) => {
            return storeItem.toJS()[property] === item[property];
          });

          if (index >= 0) {
            items = items.update(
              index, () => {
                return Immutable.Map(item);
              }
            );
          } else {
            items = items.push(Immutable.Map(item));
          }
        });
      }
      return items;
    });
  });
}

module.exports.updateObjectListByProperty = updateObjectListByProperty;