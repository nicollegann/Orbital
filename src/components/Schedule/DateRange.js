var formatStartDt = ""
var formatEndDt = ""

//date range from mon-sun for the next week   
var generateDateRange = (format, week) => {    
    
  const date = new Date().getTime()
    
  var startDt = new Date(date);
  startDt = new Date(startDt.getFullYear(), startDt.getMonth(), startDt.getDate());
  startDt = new Date(startDt.getTime() - (startDt.getDay() > 0 ? (startDt.getDay() - 1) * 1000 * 60 * 60 * 24 : 6 * 1000 * 60 * 60 * 24 ));
  
  if (week === "next") {
    startDt = new Date(startDt.getTime() + 7 * 24 * 60 * 60 * 1000)
  }

  const endDt = new Date(startDt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1)
      
  formatStartDt = startDt.getDate() + format + (startDt.getMonth() + 1) + format + startDt.getFullYear()
  formatEndDt = endDt.getDate() + format + (endDt.getMonth() + 1) + format + endDt.getFullYear()
      
  if (format === "-") {
    return formatStartDt + " to " + formatEndDt
  } else {
    return formatStartDt + " - " + formatEndDt
  }
}


export const nextWeekDash = generateDateRange("-", "next")
export const nextWeekSlash = generateDateRange("/", "next")
export const thisWeekDash = generateDateRange("-", "this")
