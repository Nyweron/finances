export const removeRowById = (list: any, id: any) => {
  const index = list.findIndex((x: any) => x.id === id);
  if (index > -1) {
    list.splice(index, 1);
  }

  return list;
};

export const findById = (list: any, id: any) =>
  list.find((x: any) => x.id === id);

export const updateByObjectId = (list: any, updated: any) =>
  list.map((row: any) => (row.id === updated.id ? updated : row));

export const sortIds = (allRows: any) =>
  allRows.sort(function (a: any, b: any) {
    return a.id - b.id || a.name.localeCompare(b.name);
  });

export const generateNewId = (generateId: any) => {
  if (
    generateId !== null &&
    generateId !== undefined &&
    generateId.length === 0
  ) {
    return 1;
  }

  return generateId[generateId.length - 1].id + 1;
};

export const filterTable = (keys: any, rows: any, route: any, isSort: any) => {
  if (keys === null || keys === undefined || keys.length === 0) {
    return rows;
  }

  const keysLength = keys.length;
  for (let i = 0; i < keysLength; i++) {
    if (keys[i] === route) {
      return rows.sort(function (current: any, next: any) {
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

function sortDescending(x: any, y: any) {
  if (x > y || y === undefined) {
    return -1;
  } else if (x < y || x === undefined) {
    return 1;
  } else {
    return 0;
  }
}

function sortAscending(x: any, y: any) {
  if (x < y || x === undefined) {
    return -1;
  } else if (x > y || y === undefined) {
    return 1;
  } else {
    return 0;
  }
}

export const getKeyFromJson = (rows: any) => {
  if (rows !== null && rows.length > 0) {
    return Object.keys(rows[0]);
  }
  return rows;
};
