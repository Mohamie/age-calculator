import { useState } from 'react'
import './App.css'
import downArrow from './assets/chevron-down-circle.svg'
import moment from 'moment';

function App() {

  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2023");
  
  const [displayYears, setDisplayYears] = useState("--");
  const [displayMonths, setDisplayMonths] = useState("--");
  const [displayDays, setDisplayDays] = useState("--");

  const [isDayValid, setIsDayValid] = useState(true);
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isYearValid, setIsYearValid] = useState(true);

  const handleDay = (event: React.FormEvent<HTMLInputElement>) => {
    setDay(event.currentTarget.value);
  }
  
  const handleMonth = (event: React.FormEvent<HTMLInputElement>) => {
    setMonth(event.currentTarget.value);
  }
  
  const handleYear = (event: React.FormEvent<HTMLInputElement>) => {
    setYear(event.currentTarget.value);
  }

  const isDateValid = (): boolean => {

    const dayValid = /^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/g.test(day); 
    const monthValid = /^(1[0-2]|0[1-9])$/g.test(month); 
    const yearValid = moment().get("year") >= +year; 

    setIsDayValid(dayValid)
    setIsMonthValid(monthValid);
    setIsYearValid(yearValid);

    return dayValid && monthValid;

  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const DOB = `${year}-${month}-${day}`;
    const years = moment().diff(DOB, 'years');
    const months = moment().diff(DOB, 'months');
    // const days = moment(`${moment().year()}-${month}-${day}`).diff(moment(), "days");

    if(!isDateValid()) return;

    setDisplayYears(`${years}`)
    setDisplayMonths(`${months - years * 12}`)
  }

  return (
    <>
      <section className="card">
        <form className="date__wrapper" onSubmit={onSubmit}>
          <div className="date_input">
            <label htmlFor="day" className="day">DAY</label>
            <input type="number" placeholder="DD" id="day" 
              value={day}
              onChange={handleDay}/>
              
            {!isDayValid && <span className="error_message">Must be a valid day</span>}
          </div>

          <div className="date_input">
            <label htmlFor="month" className="month">MONTH</label>
            
            <input type="number" placeholder="MM" id="month" 
              value={month}
              onChange={handleMonth}/>

            {!isMonthValid && <span className="error_message">Must be a valid month</span>}
          </div> 

          <div className="date_input">
            <label htmlFor="year" className="year">YEAR</label>
            <input type="number" placeholder="YYYY" id="year" 
              value={year}
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
