export default function checkDate(dateToCheck: Date, daysPassed: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() - daysPassed);

  return (
    dateToCheck.getDate() === targetDate.getDate() &&
    dateToCheck.getMonth() === targetDate.getMonth() &&
    dateToCheck.getFullYear() === targetDate.getFullYear()
  );
}
