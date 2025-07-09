export const isDateString = (str: string): boolean => {
  // Attempt to parse the string as a date
  const date = new Date(str);
  return !isNaN(date.getTime());
};

export const formatDateString = (str: string): string => {
  const date = new Date(str);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export function daysLeft(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const timeDiff = end.getTime() - today.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff > 0 ? daysDiff : 0; // Return 0 if the end date has passed
}

// Example usage:
console.log(daysLeft("2024-12-31")); // Replace with your target end date

export function calculateDurationInDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}
