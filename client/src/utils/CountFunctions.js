export function getUploadTime(uploadDate) {
  // Parse the uploaded date
  let uploadTime = new Date(uploadDate);

  // Get the current date and time
  let currentTime = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference = currentTime - uploadTime;

  // Convert milliseconds to seconds
  let seconds = Math.floor(timeDifference / 1000);

  // Define time intervals
  let minute = 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30; // Approximation, not precise

  // Format the time difference
  if (seconds < minute) {
    return `${seconds} seconds ago`;
  } else if (seconds < hour) {
    let minutes = Math.floor(seconds / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds < day) {
    let hours = Math.floor(seconds / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (seconds < month) {
    let days = Math.floor(seconds / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // If it's been more than a month, you may want to display the actual date
    let monthNames = [
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
    let year = uploadTime.getFullYear();
    let month = monthNames[uploadTime.getMonth()];
    let day = uploadTime.getDate();
    return `Uploaded on ${month} ${day}, ${year}`;
  }
}

export function CountVideoTime(data) {
  console.log(data);
  let decimalSeconds = data;

  let minutes = Math.floor(decimalSeconds / 60);
  let seconds = decimalSeconds % 60;

  let time = minutes + ":" + seconds.toFixed(0);

  return time;
}
