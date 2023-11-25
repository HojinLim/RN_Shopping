function comma(str: string) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}

function uncomma(str: string) {
  str = String(str);
  return str.replace(/[^\d]+/g, "");
}

function inputNumberFormat(value: string) {
  return comma(uncomma(value));
}

export {comma, uncomma, inputNumberFormat};