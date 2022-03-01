export const headers = [
  {
    columnName: "id",
    type: "int",
  },
  {
    columnName: "storeNumber",
    type: "int",
  },
  {
    columnName: "storeName",
    type: "string",
  },
  {
    columnName: "termCount",
    type: "int",
  },
];

export const formatDate = (d) => {
  let date = d.toString();
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return month + "/" + day + "/" + year;
};

export const isValid = (v) => {};
