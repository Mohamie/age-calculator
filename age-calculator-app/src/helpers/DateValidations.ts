export class DateValidations{
    // This function checks whether a given day, month, and year are valid
    static isValidDate(day: number, month: number, year: number) {
        const date = new Date(year, month - 1, day);
        return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
        );
    }
  
  // This function checks whether a given date is valid and not in the future
  static isValidAndNotFutureDate(day: number, month: number, year: number) {
    const today = new Date();
    const date = new Date(year, month - 1, day);
    return (
      this.isValidDate(day, month, year) &&
      date.getTime() <= today.getTime()
    );
  }
  
  // This function checks whether a given day is valid for a given month and year
  static isValidDay(day: number, month: number, year: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  }
  
  // This function checks whether a given month is valid
  static isValidMonth(month: number) {
    return month >= 1 && month <= 12;
  }
  
  // This function checks whether a given year is valid
  static isValidYear(year: number) {
    return year >= 1 && year <= 9999;
  }
}