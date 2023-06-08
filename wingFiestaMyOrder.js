'use strict';

const mainLogo = document.querySelector('.home-pg-logo');
const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.nav-links-wrapper');
const banner = document.querySelector('.banner-image-wrapper');
const orderBtn = document.querySelector('.main-pg-order-btn');
const orderMinusBtn = document.querySelector('.order-minus-btn');
const orderPlusBtn = document.querySelector('.order-plus-btn');
const orderCount = document.querySelector('.order-count');
const bagOrderCount = document.querySelector('.bag-order-count');
const checkoutOrderCount = document.querySelector('.checkout-btn-item-count');
const orderTotal = document.querySelectorAll('.order-total');
const subTotal = document.querySelector('.subtotal');
const tax = document.querySelector('.tax');

mainLogo.addEventListener('click', function () {
  window.location.href = 'wingFiesta.html';
});

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('hide');
});

/* Getting form data from the wingFiestaMenu page */
const json = localStorage.getItem('form');
const arr = JSON.parse(json);

function getFlavorsDescription(orderArray) {
  let convertToText = [];
  const flavorsKey = {
    1: 'Teriyaki',
    2: 'Garlic Parmesan',
    3: 'Lemon Pepper',
    4: 'Smokey BBQ',
    5: 'Original BBQ',
    6: 'Honey BBQ',
    7: 'Spicy BBQ',
    8: 'Cajun',
    9: 'Sweet Chilli',
    10: 'Chilli Garlic',
    11: 'Spicy Garlic',
    12: 'Mild Garlic',
    13: 'Original Spicy',
    14: 'Habanero',
    15: 'Boneless',
    16: 'Bone-In',
  };
  for (const x of orderArray) {
    convertToText.push(flavorsKey[x]);
  }
  return convertToText;
}
console.log(getFlavorsDescription(arr));

/* Displaying order on page */
let order = getFlavorsDescription(arr);
order = order.reverse();

for (const x of order) {
  const markup = `
  <div>
    <span>${x}</span>
  </div>`;
  document.getElementById('data').innerHTML += markup;
}

/* To allow only one type of wing choice to be selected. */
const checkboxes = document.querySelectorAll('.order-time-choice');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkboxes.forEach(otherCheckbox => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

/* Importing totalOrders array from WingFiestaMenu */
const jsonCopy = localStorage.getItem('forma');
const totalOrders = JSON.parse(jsonCopy);

if (totalOrders) {
  console.log(totalOrders);
} else {
  console.assert('No available orders');
}

/* Importing orderPrices array from WingFiestaMenu */
const json3 = localStorage.getItem('orderPricesForm');
let orderPrices = JSON.parse(json3);

/* Summing all the prices of each item */
orderPrices = orderPrices.reduce((a, b) => a + b);
console.log(orderPrices);

const copyOrderPrices = orderPrices;

orderTotal.forEach(item => {
  item.textContent = `$${orderPrices}`;
});

/* Remove or Add Order Count */
let count = totalOrders.length;
orderCount.textContent = count;
checkoutOrderCount.textContent = count;
bagOrderCount.textContent = count;

let calculateTax = (7.25 / 100) * orderPrices;
tax.textContent = `$${calculateTax}`;
let copyCalculateTax = calculateTax;

subTotal.textContent = `$${orderPrices - calculateTax}`;
let test = orderPrices - calculateTax;

orderPlusBtn.addEventListener('click', function () {
  if (count >= 0 && count < 25) {
    count++;
    orderCount.textContent = count;
    checkoutOrderCount.textContent = count;
    bagOrderCount.textContent = count;
    orderPrices = orderPrices + copyOrderPrices;
    orderTotal.forEach(item => {
      item.textContent = `$${orderPrices}`;
    });

    tax.textContent = `$${(calculateTax += copyCalculateTax)}`;
    subTotal.textContent = `$${orderPrices - calculateTax}`;
  }
});

orderMinusBtn.addEventListener('click', function () {
  if (count > 0) {
    count--;
    orderCount.textContent = count;
    checkoutOrderCount.textContent = count;
    bagOrderCount.textContent = count;
    orderPrices -= copyOrderPrices;
    orderTotal.forEach(item => {
      item.textContent = `$${orderPrices}`;
    });

    calculateTax = (7.25 / 100) * orderPrices;
    calculateTax - copyCalculateTax;
    tax.textContent = `$${calculateTax}`;
    subTotal.textContent -= test;
    console.log(test);
  }
});

// subTotal.textContent = 'hi';
