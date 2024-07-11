type PaySpan = 'weekly' | 'bi-weekly' | 'monthly';

function isWeekend(payDay: Date): boolean {
  const dayOfWeek = payDay.getDay(); // 0 (Sunday) to 6 (Saturday)
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}

function dueDayIsDaysLaterThanFundDay(dueDate: Date, payDay: Date): boolean {
  // Check if the due date is at least 10 days after the fund day
  if(dueDate.getTime() >= payDay.getTime() + 10) {
    return true;
  }
  return false;
  
}

function isHoliday(payDay: Date, holidays: Date[]): boolean {
  // Check if the payDay matches any of the provided holidays
  return holidays.some(holiday => holiday.getTime() === payDay.getTime());
}

const getPayDay = (fundDay: Date, paySpan: PaySpan, randomPayDay: Date) => {
  let payDate = new Date(fundDay);
  switch(paySpan) {
    case 'weekly':
      payDate.setDate(payDate.getDate() + 7);
      break;
    case 'bi-weekly':
      payDate.setDate(payDate.getDate() + 14);
      break;
    case 'monthly':
      payDate.setMonth(payDate.getMonth() + 1);
      break;
    default:
      throw new Error('Invalid paySpan');
  }
  return payDate;
}

class PayDateCalculator {
  public calculateDueDate(fundDay: Date, holidays: Date[], paySpan: PaySpan,
                            randomPayDay: Date, hasDirectDeposit: boolean): Date {
      let dueDate = getPayDay(fundDay, paySpan, randomPayDay);
      if(hasDirectDeposit) {
        if(!isWeekend(dueDate)) {
          if(!isHoliday(dueDate, holidays)) {
            if(dueDayIsDaysLaterThanFundDay(dueDate, fundDay))
              return dueDate;
            else {
              return getPayDay(dueDate, paySpan, randomPayDay);
            }
          }
        }
      } else {
        dueDate.setDate(dueDate.getDate() + 1);
        return getPayDay(dueDate, paySpan, randomPayDay);
      }
      return dueDate;
    }

}
const calculator = new PayDateCalculator;
/**
 * input 7-11
 * output 7-18
 */
console.log(calculator.calculateDueDate(new Date(), [new Date()], 'weekly', new Date(), true));

