export default function checkDate(dateToCheck: Date, daysPassed: number) {
  const today = new Date();

  const targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() - daysPassed);

  return (
    dateToCheck.getDate() === targetDate.getDate() &&
    dateToCheck.getMonth() === targetDate.getMonth() &&
    dateToCheck.getFullYear() === targetDate.getFullYear()
  );
}
