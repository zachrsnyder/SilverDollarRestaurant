/**
 * Description placeholder
 *
 * @typedef {DayOfWeek}
 */
type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// interface for how to format 
/**
 * Description placeholder
 *
 * @export
 * @interface RestaurantHours
 * @typedef {RestaurantHours}
 */
export interface RestaurantHours {
  /**
   * Description placeholder
   *
   * @type {DayOfWeek}
   */
  day: DayOfWeek;
  /**
   * Description placeholder
   *
   * @type {string}
   */
  hours: string;
}

/**
 * Description placeholder
 *
 * @type {DayOfWeek[]}
 */
const DAYS_OF_WEEK: DayOfWeek[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Description placeholder
 *
 * @returns {RestaurantHours[]}
 */
export const getRestaurantHours = () : RestaurantHours[] => {

    const hours: RestaurantHours[] = [
        { day: 'Monday', hours: '6:30 AM - 9 PM' },
        { day: 'Tuesday', hours: '6:30 AM - 9 PM' },
        { day: 'Wednesday', hours: '6:30 AM - 9 PM' },
        { day: 'Thursday', hours: '6:30 AM - 9 PM' },
        { day: 'Friday', hours: '6:30 AM - 9 PM' },
        { day: 'Saturday', hours: '6:30 AM - 9 PM' },
        { day: 'Sunday', hours: '6:30 AM - 3 PM' }
    ];
  // Get current day as number (0-6, where 0 is Sunday)
  const currentDayNum = new Date().getDay();
  const currentDay = DAYS_OF_WEEK[currentDayNum];

  // Create a map for easy lookup
  const hoursMap = new Map(hours.map(h => [h.day, h]));

  // Start from current day and build new array
  const sortedHours: RestaurantHours[] = [];
  
  // Add days from current day to end of week
  for (let i = currentDayNum; i < DAYS_OF_WEEK.length; i++) {
    const day = DAYS_OF_WEEK[i];
    const dayHours = hoursMap.get(day);
    if (dayHours) {
      sortedHours.push(dayHours);
    }
  }
  
  // Add days from start of week to current day
  for (let i = 0; i < currentDayNum; i++) {
    const day = DAYS_OF_WEEK[i];
    const dayHours = hoursMap.get(day);
    if (dayHours) {
      sortedHours.push(dayHours);
    }
  }

  return sortedHours;
};
