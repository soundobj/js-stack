function revertChanges(parts) {
  return parts.reduce((acc, val) => {
    if (val.revert) {
      if (val.removed) {
        return acc += val.value;
      }
      if (val.added) {
        return acc;
      }
    } else if (val.removed && !val.revert) {
      return acc;
    }
    return acc += val.value;
  }, "");
}

module.exports.revertChanges = revertChanges;