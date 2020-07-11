const prices = document.querySelectorAll('.price');
prices.forEach(el => {
  el.textContent = new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency'
  }).format(el.textContent)
})