export function formatDate(inputDate:string) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [year, month, day] = inputDate.split('-');
    const monthName = months[parseInt(month, 10) - 1];
  
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  }