```ts
    if (hasDirectDeposit) {    if(this.isDueDateValid(dueDay, fundDay)){

    }
      // DueDate is a weekend?
      if (this.isWeekend(payDay)) {
        dueDate = this.addDays(payDay, 1);
        while (this.isWeekend(dueDate)) {
          dueDate = this.addDays(dueDate, 1);
        }
      } else {
        // DueDate is a holiday?
        if (this.isHoliday(dueDate, holidays)) {
          // Set loopType to reverse
          dueDate = subtractDays(payDay, 1);
          while (this.isWeekend(dueDate)) {
            dueDate = subtractDays(dueDate, 1);
          }
        } else {
          // Check if dueDate >= fundDay + 10 days
          const tenDaysAfterFund = this.addDays(fundDay, 10);
          if (dueDate >= tenDaysAfterFund) {
            return dueDate;
          } else {
            // Set dueDate to next payDay
            dueDate = getNextPayDay(payDay);
            // Check hasDirectDeposit again
            if (!hasDirectDeposit) {
              dueDate = this.addDays(dueDate, 1);
              while (this.isWeekend(dueDate)) {
                dueDate = this.addDays(dueDate, 1);
              }
            }
          }
        }
      }
    } else {
      // DueDate + 1 day
      dueDate = this.addDays(payDay, 1);
      while (this.isWeekend(dueDate)) {
        dueDate = this.addDays(dueDate, 1);
      }
    }

    return dueDate;

// Helper functions for checking weekends, holidays, and getting next pay day
  private isWeekend(payDay: Date): boolean {
    const dayOfWeek = payDay.getDay(); // 0 (Sunday) to 6 (Saturday)
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  }

  private isHoliday(payDay: Date, holidays: Date[]): boolean {
    // Check if the payDay matches any of the provided holidays
    return holidays.some(holiday => holiday.getTime() === payDay.getTime());
  }
  

  private addDays(payDay: Date, days: number): Date {
    const nextDay = new Date(payDay);
    nextDay.setDate(nextDay.getDate() + days);
    return nextDay;
  }

  private subtractDays(date: Date, days: number): Date {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const previousDayTimestamp = date.getTime() - (days * oneDayInMilliseconds);
    return new Date(previousDayTimestamp);
}

  private getNextPayDay(randomPayDay: Date, fundDay: Date, paySpan: PaySpan): Date {
    if(this.isDueDateValid())
    

    return payDate;
  }

  private isDueDateValid(dueDate: Date, fundDay: Date): boolean {
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    const expectedFundDay = new Date(fundDay.getTime() + tenDaysInMilliseconds);
    return dueDate >= expectedFundDay;
}
private (dueDate: Date, fundDay: Date): boolean {
  const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
  const expectedFundDay = new Date(fundDay.getTime() + tenDaysInMilliseconds);
  return dueDate >= expectedFundDay;
}
```


