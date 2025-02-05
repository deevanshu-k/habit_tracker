export type MONTH = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getMonthName = (month: MONTH): string => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[month - 1] || "Invalid month";
};

export const getDaysInMonth = (year: number, month: MONTH): number => {
    return new Date(year, month, 0).getDate();
};

export const getOneLetterDayName = (
    year: number,
    month: MONTH,
    day: number
): string => {
    const date = new Date(year, month - 1, day); // Month is 0-based
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()][0];
};
