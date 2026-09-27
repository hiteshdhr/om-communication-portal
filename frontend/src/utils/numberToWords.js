// Converts a given number into Indian English Words (Rupees & Paise)

export function numberToWordsINR(num) {
  if (num === null || num === undefined || isNaN(num)) return 'Zero Rupees Only'
  
  const n = Math.floor(Math.abs(Number(num)))
  if (n === 0) return 'Zero Rupees Only'

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  function convertTwoDigits(v) {
    if (v < 20) return units[v]
    const ten = Math.floor(v / 10)
    const unit = v % 10
    return tens[ten] + (unit ? ' ' + units[unit] : '')
  }

  function convertThreeDigits(v) {
    const hundred = Math.floor(v / 100)
    const remainder = v % 100
    let res = ''
    if (hundred) {
      res += units[hundred] + ' Hundred'
    }
    if (remainder) {
      res += (res ? ' ' : '') + convertTwoDigits(remainder)
    }
    return res
  }

  let words = ''
  
  // Crores (10,00,00,000)
  const crore = Math.floor(n / 10000000)
  let remainder = n % 10000000
  if (crore > 0) {
    words += convertThreeDigits(crore) + ' Crore '
  }

  // Lakhs (1,00,000)
  const lakh = Math.floor(remainder / 100000)
  remainder = remainder % 100000
  if (lakh > 0) {
    words += convertTwoDigits(lakh) + ' Lakh '
  }

  // Thousands (1,000)
  const thousand = Math.floor(remainder / 1000)
  remainder = remainder % 1000
  if (thousand > 0) {
    words += convertTwoDigits(thousand) + ' Thousand '
  }

  // Hundreds & Units
  if (remainder > 0) {
    words += convertThreeDigits(remainder)
  }

  const trimmed = words.trim()
  return `${trimmed} Rupees Only`
}
