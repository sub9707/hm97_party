import React from 'react';
import styles from './Calendar.module.scss';

const Calendar = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const generateCalendarData = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = 31;
    const daysInPrevMonth = 30;

    const prevMonthDaysCount = firstDayOfMonth;

    const prevMonthDays = Array.from({ length: prevMonthDaysCount }, (_, i) => daysInPrevMonth - prevMonthDaysCount + i + 1);
    const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    const nextMonthDays = Array.from(
      { length: 42 - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => i + 1
    );

    return { prevMonthDays, currentMonthDays, nextMonthDays, calendarData: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays] };
  };

  const { prevMonthDays, currentMonthDays, nextMonthDays, calendarData } = generateCalendarData();

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <header className={styles.header}>
          <div className={styles.day}>{currentDay}</div>
          <div className={styles.month}>December</div>
        </header>
        <table className={styles.calendar}>
          <thead>
            <tr>
              <td>Sun</td>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }, (_, week) => (
              <tr key={week}>
                {calendarData.slice(week * 7, week * 7 + 7).map((day, idx) => {
                  const dayIndex = week * 7 + idx;

                  const isPrevMonth = dayIndex < prevMonthDays.length;
                  const isNextMonth = dayIndex >= prevMonthDays.length + currentMonthDays.length;
                  const isToday = !isPrevMonth && !isNextMonth && day === currentDay;
                  const isSpecialDay = !isPrevMonth && !isNextMonth && day === 28;

                  return (
                    <td
                      key={idx}
                      className={`${styles.cell} ${
                        isToday ? styles.today : ''
                      } ${isPrevMonth ? styles.prevMonth : ''} ${
                        isNextMonth ? styles.nextMonth : ''
                      }`}
                    >
                      {isSpecialDay ? (
                        <div className={`${styles.specialDay} center-box`}>
                          <div className="animated-border-box-glow"></div>
                          <div className="animated-border-box">{day}</div>
                        </div>
                      ) : (
                        day
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.ringLeft}></div>
        <div className={styles.ringRight}></div>
      </div>
    </div>
  );
};

export default Calendar;
