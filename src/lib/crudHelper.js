export const removeRowById = (list, id) => {
  const index = list.findIndex((x) => x.id === id);
  if (index > -1) {
    list.splice(index, 1);
  }

  return list;
};

export const findById = (list, id) => list.find((x) => x.id === id);

export const updateByObjectId = (list, updated) =>
  list.map((row) => (row.id === updated.id ? updated : row));

export const sortIds = (allRows) =>
  allRows.sort(function (a, b) {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

export const generateNewId = (generateId) => {

  if (
    generateId !== null &&
    generateId !== undefined &&
    generateId.length === 0
  ) {
    return 1;
  }

  return generateId[generateId.length - 1].id + 1;
};

export const filterTable = (keys, rows, route, isSort) => {
  if (keys === null || keys === undefined || keys.length === 0) {
    return rows;
  }

  const keysLength = keys.length;
  for (let i = 0; i < keysLength; i++) {
    if (keys[i] === route) {
      return rows.sort(function (current, next) {
        let x = current[keys[i]];
        let y = next[keys[i]];

        if (typeof x === "string") {
          x = x.toUpperCase();
        }
        if (typeof y === "string") {
          y = y.toUpperCase();
        }

        if (isSort) {
          return sortDescending(x, y);
        } else {
          return sortAscending(x, y);
        }
      });
    } /*END if (keys[i] === route)*/
  } /*END for*/
  return rows;
};

function sortDescending(x, y) {
  if (x > y || y === undefined) {
    return -1;
  } else if (x < y || x === undefined) {
    return 1;
  } else {
    return 0;
  }
}

function sortAscending(x, y) {
  if (x < y || x === undefined) {
    return -1;
  } else if (x > y || y === undefined) {
    return 1;
  } else {
    return 0;
  }
}

export const getKeyFromJson = (rows) => {
  if (rows !== null && rows.length > 0) {
    return Object.keys(rows[0]);
  }
  return rows;
};
