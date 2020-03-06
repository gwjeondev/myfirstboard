export const convertToTrees = (
  array,
  idFieldName,
  parentIdFieldName,
  childrenFieldName
) => {
  var cloned = array.slice();
  for (var i = cloned.length - 1; i >= 0; i--) {
    if (cloned[i][parentIdFieldName]) {
      var parentId = cloned[i][parentIdFieldName][idFieldName];
    } else {
      var parentId = cloned[i][parentIdFieldName];
    }

    if (parentId) {
      var filtered = array.filter(function(elem) {
        return elem[idFieldName].toString() == parentId.toString();
      });

      if (filtered.length) {
        var parent = filtered[0];

        parent[childrenFieldName].push(cloned[i]);
      }
      cloned.splice(i, 1);
    }
  }
  return cloned;
};