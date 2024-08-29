const calculateBtn = document.getElementById('calculate-btn')
const dayInput = document.getElementById('day-input')
const monthInput = document.getElementById('month-input')
const yearInput = document.getElementById('year-input')
const dayLabel = document.getElementById('day-label')
const monthLabel = document.getElementById('month-label')
const yearLabel = document.getElementById('year-label')
const dayError = document.getElementById('error-day')
const monthError = document.getElementById('error-month')
const yearError = document.getElementById('error-year')
const formError = document.getElementById('error-form')
const rangeError = document.getElementById('error-range')
const yearsResult = document.getElementById('years-result')
const monthsResult = document.getElementById('months-result')
const daysResult = document.getElementById('days-result')

dayInput.addEventListener(
  'focusout',
  () => (dayInput.value = dayInput.value.padStart(2, '0'))
)
monthInput.addEventListener(
  'focusout',
  () => (monthInput.value = monthInput.value.padStart(2, '0'))
)

function reset() {
  dayLabel.style.color = '#716f6f'
  monthLabel.style.color = '#716f6f'
  yearLabel.style.color = '#716f6f'
  dayError.classList.add('hidden')
  monthError.classList.add('hidden')
  yearError.classList.add('hidden')
  formError.classList.add('hidden')
  monthInput.style.borderColor = '#716f6f'
  yearsResult.textContent = '--'
  monthsResult.textContent = '--'
  daysResult.textContent = '--'
}

function validateInputs() {
  const day = parseInt(dayInput.value)
  const month = parseInt(monthInput.value)
  const year = parseInt(yearInput.value)

  if (!day || !month || !year) {
    if (!day) {
      dayError.classList.remove('hidden')
      return false
    }
    if (!month) {
      monthError.classList.remove('hidden')
      return false
    }
    if (!year) {
      yearError.classList.remove('hidden')
      return false
    }
  }

  if (year < new Date().getFullYear() - 120) {
    formError.classList.remove('hidden')
    return false
  }

  if (month < 1 || month > 12) {
    monthError.classList.remove('hidden')
    return false
  }

  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    if (day < 1 || day > 31) {
      formError.classList.remove('hidden')
      return false
    }
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (day < 1 || day > 30) {
      formError.classList.remove('hidden')
      return false
    }
  }

  if (month === 2) {
    if (year % 400 === 0) {
      if (day > 29) {
        formError.classList.remove('hidden')
        return false
      }
    } else if (year % 100 === 0 && year % 4 === 0) {
      if (day > 28) {
        formError.classList.remove('hidden')
        return false
      }
    } else if (year % 4 === 0) {
      if (day > 29) {
        formError.classList.remove('hidden')
        return false
      }
    } else {
      if (day > 28) {
        formError.cl
        return falseassList.remove('hidden')
      }
    }
  }

  const today = new Date()
  const userDate = new Date(year, month - 1, day)

  if (today < userDate) {
    yearLabel.style.color = '#ff5757'
    yearError.classList.remove('hidden')
    return false
  }

  return true
}

function calculateResult() {
  reset()
  const isValid = validateInputs()

  if (!isValid) {
    yearsResult.textContent = '--'
    monthsResult.textContent = '--'
    daysResult.textContent = '--'
    return
  }

  const userDate = parseInt(dayInput.value)
  const userMonth = parseInt(monthInput.value)
  const userYear = parseInt(yearInput.value)

  const today = new Date()
  const thisDate = today.getDate()
  const thisMonth = today.getMonth() + 1
  const thisYear = today.getFullYear()

  let ageYears = thisYear - userYear
  let ageMonths = thisMonth - userMonth
  let ageDays = thisDate - userDate

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--
    ageMonths = 12 + ageMonths
  }

  if (ageDays < 0) {
    if (
      thisMonth === 1 ||
      thisMonth === 3 ||
      thisMonth === 5 ||
      thisMonth === 7 ||
      thisMonth === 8 ||
      thisMonth === 10 ||
      thisMonth === 12
    ) {
      ageDays = 31 + ageDays
    }

    if (
      thisMonth === 4 ||
      thisMonth === 6 ||
      thisMonth === 9 ||
      thisMonth === 11
    ) {
      ageDays = 30 + ageDays
    }
    if (thisMonth === 2) {
      if (thisYear % 400 === 0) {
        ageDays = 29 + ageDays
      } else if (thisYear % 100 === 0 && thisYear % 4 === 0) {
        ageDays = 28 + ageDays
      } else if (thisYear % 4 === 0) {
        ageDays = 29 + ageDays
      } else {
        ageDays = 28 + ageDays
      }
    }
  }

  yearsResult.textContent = ageYears.toString().padStart(2, '0')
  monthsResult.textContent = ageMonths.toString().padStart(2, '0')
  daysResult.textContent = ageDays.toString().padStart(2, '0')
}

calculateBtn.addEventListener('click', () => calculateResult())
