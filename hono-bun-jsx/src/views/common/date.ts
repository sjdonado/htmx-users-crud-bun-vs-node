export const fortmatDateTime = (date: string) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', // 'Monday'
    year: 'numeric', // '2023'
    month: 'long', // 'August'
    day: 'numeric', // '21'
    hour: 'numeric', // '11'
    minute: 'numeric', // '30'
  }).format(new Date(date));

  return formattedDate;
};
