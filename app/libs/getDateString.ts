export function getDateString(input: Date) {
  const year = input.getFullYear();
  let month = (input.getMonth() + 1).toString();
  let date = input.getDate().toString();
  if (month.length === 1) month = '0' + month;
  if (date.length === 1) date = '0' + date;
  return `${year}-${month}-${date}`;
}
