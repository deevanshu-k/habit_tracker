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

export const getCalendarGrid = (
    year: number,
    month: number
): (number | null)[][] => {
    const now = new Date();
    const firstDay = new Date(year, month, 1).getDay(); // Get starting weekday (0 = Sunday, ..., 6 = Saturday)
    const totalDays = new Date(year, month + 1, 0).getDate(); // Get total days in the current month

    let grid: (number | null)[][] = []; // Grid containing weeks (arrays)
    let week: (number | null)[] = [];

    // Fill previous month's empty slots with null
    for (let i = 0; i < firstDay; i++) {
        week.push(null);
    }

    // Fill current month days
    for (let i = 1; i <= totalDays; i++) {
        if (
            year > now.getFullYear() ||
            (year == now.getFullYear() && month > now.getMonth()) ||
            (year == now.getFullYear() &&
                month == now.getMonth() &&
                i > now.getDate())
        ) {
            week.push(null);
        } else {
            week.push(new Date(year, month, i).getDate()); // "YYYY-MM-DD"
        }

        // If week is complete, push to grid and reset
        if (week.length === 7) {
            grid.push([...week]);
            week = [];
        }
    }

    // Push remaining days (incomplete last week)
    if (week.length > 0) {
        while (week.length < 7) {
            week.push(null); // Fill with nulls for empty slots
        }
        grid.push([...week]);
    }

    return grid;
};
