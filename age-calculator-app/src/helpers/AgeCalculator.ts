export const getAge = (day: number, month: number, year: number) => {
  const today = new Date();
  const birthDate = new Date(`${month}/${day}/${year}`);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Check if the birth date is later than today's date
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // If the birth date is in the same month as today's date
  if (months === 0) {
    const diffDays = today.getDate() - birthDate.getDate();
    if (diffDays < 0) {
      months--;
      days = new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate() + diffDays;
    } else {
      days = diffDays;
    }
  }

  // If the birth date is in a different month than today's date
  if (months < 0) {
    months += 12;
    const diffDays = today.getDate() - birthDate.getDate();
    if (diffDays < 0) {
      months--;
      days = new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate() + diffDays;
    } else {
      days = diffDays;
    }
  }

  return {years, months, days};
}