export const formatCurrency = (amount: string) => {
  if (amount != null) {
      let num_ = parseInt(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      let num = num_.split(".")
      let currency;
      if (num[num.length - 1] == "00") {
          currency = num[0]
      } else {
          currency = num_
      }
      return currency;
  }
}