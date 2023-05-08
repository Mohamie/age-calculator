import { useEffect, useState } from 'react';
import './App.css';
import downArrow from './assets/chevron-down-circle.svg';
import { DateValidations } from './helpers/DateValidations';
import { getAge } from './helpers/AgeCalculator';

function App() {

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  
  const [displayYears, setDisplayYears] = useState("--");
  const [displayMonths, setDisplayMonths] = useState("--");
  const [displayDays, setDisplayDays] = useState("--");

  const [isDayValid, setIsDayValid] = useState(true);
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  useEffect(() => {

    if(!isValidDate){
      resetResultsDisplay();
    }

  }, [isValidDate]);

  const handleDay = (event: React.FormEvent<HTMLInputElement>) => {
    setDay(+event.currentTarget.value);
    setIsDayValid(true);
  }
  
  const handleMonth = (event: React.FormEvent<HTMLInputElement>) => {
    setMonth(+event.currentTarget.value);
    setIsMonthValid(true);
  }
  
  const handleYear = (event: React.FormEvent<HTMLInputElement>) => {
    setYear(+event.currentTarget.value);
    setIsYearValid(true);
  }

  const isDateValid = (): boolean => {

    const yearValid = DateValidations.isValidYear(year) && DateValidations.isValidAndNotFutureDate(day, month, year);
    const monthValid = DateValidations.isValidMonth(month);
    const dayValid = DateValidations.isValidDay(day, month, year);
    const dateValid = DateValidations.isValidDate(day, month, year) && DateValidations.isValidAndNotFutureDate(day, month, year);
   
    setIsDayValid(dayValid)
    setIsMonthValid(monthValid);
    setIsYearValid(yearValid);
    setIsValidDate(dayValid && monthValid && yearValid && dateValid);

    return dayValid && monthValid && yearValid && dateValid;

  }

  const resetResultsDisplay = () => {
    setDisplayYears("--");
    setDisplayMonths("--");
    setDisplayDays("--");
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

  
    if(!isDateValid()) return;

    const {years, months, days} = getAge(day, month, year);

    setDisplayYears(`${years}`);
    setDisplayMonths(`${months}`);
    setDisplayDays(`${days}`);
  }

  return (
    <>
      <section className="card">
        <form className="date__wrapper" onSubmit={onSubmit}>
          <div className="date_input">
            <label htmlFor="day" className={`day ${!isDayValid && 'error'}`}>DAY</label>
            <input type="number" placeholder="DD" id="day" className={`${!isDayValid && 'error'}`} 
              onChange={handleDay}/>
              
            {!isDayValid && <span className="error_message">Must be a valid day</span>}
          </div>

          <div className="date_input">
            <label htmlFor="month" className={`month ${!isMonthValid && 'error'}`}>MONTH</label>
            
            <input type="number" placeholder="MM" id="month"
              className={`${!isMonthValid && 'error'}`} 
              onChange={handleMonth}/>

            {!isMonthValid && <span className="error_message">Must be a valid month</span>}
          </div> 

          <div className="date_input">
            <label htmlFor="year" className={`year ${!isYearValid && 'error'}`}>YEAR</label>
            <input type="number" placeholder="YYYY" id="year"
              className={`${!isYearValid && 'error'}`} 
              onChange={handleYear}/>

            {!isYearValid && <span className="error_message">Must be a valid year</span>}
          </div> 
          
          <div className="form__footer">
            <hr />
            <button type="submit"><img src={downArrow} alt="" /></button>
          </div>
        </form>

        <div className="results_wrapper">
          <p><span>{displayYears}</span>years</p>
          <p><span>{displayMonths}</span>months</p>
          <p><span>{displayDays}</span>days</p>
        </div>
      </section>
    </>
  )
}

export default App
