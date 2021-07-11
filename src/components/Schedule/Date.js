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

const todayDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const monthDoubleDigit = (month < 10) ? "0" + month : month
  const day = date.getDate()
  const dayDoubleDigit = (day < 10) ? "0" + day : day 

  return year + "-" + monthDoubleDigit + "-" + dayDoubleDigit
}

export function orderByTime(arr) {
  const length = arr.length
  if (length <= 1) {
    return arr
  } else {
    let newArr = []
    let temp = []
    for (let i = 0; i < length-1 ; i++) {
      if (i === length-2) {
        if (arr[i].date === arr[i+1].date) {
          temp.push(arr[i])
          temp.push(arr[i+1])
          temp.sort((a, b) => a.startTime >= b.startTime ? 1 : -1)
          newArr = newArr.concat(temp)
        } else {
          temp.push(arr[i])
          temp.sort((a, b) => a.startTime >= b.startTime ? 1 : -1)
          newArr = newArr.concat(temp)
          newArr.push(arr[i+1])
        }
      } else {
      if (arr[i].date === arr[i+1].date) {
        temp.push(arr[i])
      } else {
        temp.push(arr[i])
        temp.sort((a, b) => a.startTime >= b.startTime ? 1 : -1)
        newArr = newArr.concat(temp)
        temp = []
      }
    }
    }
    return newArr 
  }   
}


export const nextWeekDash = generateDateRange("-", "next")
export const nextWeekSlash = generateDateRange("/", "next")
export const thisWeekDash = generateDateRange("-", "this")
export const today = todayDate()