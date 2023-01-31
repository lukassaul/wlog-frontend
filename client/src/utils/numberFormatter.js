const format = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'none',
}
  
export function formatCurrency (value) {
    const stripSymbols = (format.currencyDisplay === 'none')
    const localFormat = stripSymbols ? {...format, currencyDisplay: 'code'} : format
    let result = Intl.NumberFormat(undefined, localFormat).format(value)
    if (stripSymbols) {
        result = result.replace(/[a-z]{3}/i, "").trim()
    }
    return result
}