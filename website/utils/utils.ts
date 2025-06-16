export const formatMusicList = (str: string): string => {
  if (str === undefined || str === null) return "";

  const music_types = str?.split(",");
  let ret = "";
  music_types.map((item, i, arr) => {
    if (arr.length - 1 === i) {
      ret += ` ${item}`;
    } else if (i === 0) {
      ret += `${item} •`;
    } else {
      ret += ` ${item} •`;
    }
  });
  return ret;
};

export const removeEmptyKeys = (obj: any) => {
  Object.keys(obj).forEach(
    (key) =>
      obj[key] === null ||
      obj[key] === undefined ||
      (obj[key] === "" && delete obj[key])
  );
  return obj;
};

export const getTimeSlots = () => {
  var timeArray = [];
  var startTime = new Date();
  startTime.setHours(7, 0, 0, 0); // Set the start time to 7:00 AM

  var endTime = new Date();
  endTime.setHours(21, 0, 0, 0); // Set the end time to 9:00 PM

  var currentTime = startTime;

  while (currentTime <= endTime) {
    var formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    timeArray.push(formattedTime.toLowerCase()); // Add the formatted time to the array
    currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment time by 15 minutes
  }

  return timeArray;
};

/**
 * get days & hours array from query string in this format: Monday_morning|Monday_afternoon|Tuesday_evening
 */
export const getDaysAndHours = (queryStr) => {
  if (queryStr === undefined || queryStr === null || queryStr === "") {
    return { days: [], hours: [] };
  }
  const arr = queryStr.split("|");
  const all_days = arr.map((item) => item.split("_")[0]);
  const unique_days = all_days.filter(
    (day, index, currentVal) => currentVal.indexOf(day) === index
  );

  return { days: unique_days, hours: arr };
};

export const setStarRating = (totalRating: number, reviewCount: number) => {
  const avgRating = Math.floor(totalRating / reviewCount);

  if (isNaN(avgRating)) return 0;

  return avgRating;
};

export const getUniqueItemsByKey = (arr, key) => {
  const uniqueMap = new Map(); // Create a map to store unique items

  for (const item of arr) {
    const keyValue = item[key]; // Get the value of the specified key
    if (!uniqueMap.has(keyValue)) {
      uniqueMap.set(keyValue, item); // Add the item to the map if it's not already present
    }
  }

  return Array.from(uniqueMap.values()); // Convert the map back to an array of unique items
};

export const formatMySQLDateTimeToHumanFriendly = (mysqlDateTime) => {
  const date = new Date(mysqlDateTime);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

export const convertMySQLDateTimeToISO = (mysqlDateTime) => {
  const [datePart, timePart] = mysqlDateTime.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = timePart.split(":");

  // Create an ISO-formatted date-time string
  const isoDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

  return isoDateTime;
};


// "2017-04-01"

export const getCurrentDate = () => {
  const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

return `${year}-${month}-${day}`;
}

export const getSelectedDateTime = (type: string = "date" || "time" ,selectedDate: Date) => {

  // selectedDates are in ISO formats , new Date()
  // type parameter is a string

  const TYPE_DATE = "date";
  const TYPE_TIME = "time";

  if ( type === TYPE_DATE  ) {

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;

  }else if(type === TYPE_TIME) {

    const hour = selectedDate.getHours();
    const minute = selectedDate.getMinutes();

    return `${hour}:${minute}` // returns 24 hours format ex: 14:28

  }

}

export const back = () => window.history.back();

export const extractCityName = (cityString : string) => {
  // Check if the string contains a comma
  if (cityString.includes(',')) {
    // Split the string at the comma and trim any extra spaces
    const [cityName] = cityString.split(',').map(part => part.trim());
    return cityName;
  } else {
    // If there's no comma, just return the original string
    return cityString;
  }
};
