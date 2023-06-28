'use strict';

const mainLogo = document.querySelector('.home-pg-logo');
const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.nav-links-wrapper');
const banner = document.querySelector('.banner-image-wrapper');
const orderBtn = document.querySelector('.main-pg-order-btn');
const orderMinusBtn = document.querySelectorAll('.order-minus-btn');
const orderPlusBtn = document.querySelectorAll('.order-plus-btn');
let orderCount = document.querySelectorAll('.order-count');
const bagOrderCount = document.querySelector('.bag-order-count');
const checkoutOrderCount = document.querySelector('.checkout-btn-item-count');
const orderTotal = document.querySelectorAll('.order-total');
const subTotal = document.querySelector('.subtotal');
const tax = document.querySelector('.tax');
const orderClear = document.querySelector('.order-clear');
const checkOutBtn = document.querySelector('.checkout-btn');

const data = document.querySelector('.order-items');

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
    15: 'Boneless Wings',
    16: 'Bone-In Wings',
  };
  for (const x of orderArray) {
    convertToText.push(flavorsKey[x]);
  }
  return convertToText;
}
console.log(getFlavorsDescription(arr));

/* Importing totalOrders array from WingFiestaMenu */
const jsonCopy = localStorage.getItem('forma');
const totalOrders = JSON.parse(jsonCopy);
console.log(totalOrders);

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

let copyOrderPrices = orderPrices;

orderTotal.forEach(item => {
  item.textContent = `$${orderPrices.toFixed(2)}`;
});

/* Displaying order on page */
let order = getFlavorsDescription(arr);
order = order.reverse();

let count = totalOrders.length;
localStorage.setItem('mainOrderCount', count);
let mainItemsCount = Number(localStorage.getItem('mainOrderCount'));

orderCount.forEach(item => {
  item.textContent = count;
});

for (const x of order) {
  let markup = `
<div>
  <span>${x}</span>
</div>`;
  if (x === order[0]) {
    markup = `
<div class="main-item">
  <span>${x}</span>
  <div class="order-count-wrapper">
</div>`;
  } else {
    markup = `
    <div class="main-item-flavors">
      <span>${x}</span>
    <div>
   `;
  }

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

/* Remove or Add Order Count */
// let count = totalOrders.length;
orderCount.forEach(item => {
  item.textContent = count;
});
checkoutOrderCount.textContent = count;
bagOrderCount.textContent = count;

let calculateTax = (7.25 / 100) * orderPrices;
tax.textContent = `$${calculateTax.toFixed(2)}`;
let copyCalculateTax = calculateTax;

subTotal.textContent = `$${(orderPrices - calculateTax).toFixed(2)}`;

data.addEventListener('click', function (event) {
  const target = event.target;

  if (target.classList.contains('order-plus-btn')) {
    plusBtnClick();
  } else if (target.classList.contains('order-minus-btn')) {
    minusBtnClick();
  }
});

let plusBtnClick = function () {
  orderCount = document.querySelectorAll('.order-count');

  if (count >= 0 && count < 25) {
    count++;
    console.log(count, 'plus');
    orderCount.forEach(item => {
      item.textContent = count;
    });
    checkoutOrderCount.textContent = count;
    bagOrderCount.textContent = count;
    bagOrderCount.style.display = 'block';

    orderPrices += copyOrderPrices;

    orderTotal.forEach(item => {
      item.textContent = `$${orderPrices.toFixed(2)}`;
    });

    tax.textContent = `$${(calculateTax += copyCalculateTax).toFixed(2)}`;
    subTotal.textContent = `$${(orderPrices - calculateTax).toFixed(2)}`;
    // orderCount = document.querySelectorAll('.order-count');
  }

  localStorage.setItem('mainOrderCount', count);
  mainItemsCountFn();
};

let copyPlusBtnClick = plusBtnClick;

let minusBtnClick = function () {
  console.log(count, 'Count');

  if (count > 0) {
    count--;

    orderCount.forEach(item => {
      item.textContent = count;
    });
    checkoutOrderCount.textContent = count;
    bagOrderCount.textContent = count;

    orderPrices -= copyOrderPrices;
    orderTotal.forEach(item => {
      item.textContent = `$${orderPrices.toFixed(2)}`;
    });

    calculateTax = (7.25 / 100) * orderPrices;
    calculateTax -= copyCalculateTax;
    tax.textContent = `$${calculateTax.toFixed(2)}`;
    subTotal.textContent = `$${(orderPrices - calculateTax).toFixed(2)}`;
  }

  // if (count === 0) {
  //   clearOrder();
  //   orderClear.style.cursor = 'default';
  //   orderClear.style.opacity = '50%';
  // }

  localStorage.setItem('mainOrderCount', count);
  mainItemsCountFn();
};

function mainItemsCountFn() {
  let mainItemsCount = Number(localStorage.getItem('mainOrderCount'));

  localStorage.setItem('mainOrderCount', mainItemsCount);

  console.log(mainItemsCount);
}

const copyMinusBtnClick = minusBtnClick;

orderPlusBtn.forEach(function (btn) {
  console.log('you');
  btn.addEventListener('click', plusBtnClick);
});

orderMinusBtn.forEach(minusBtn => {
  console.log(count, 'Counts');
  minusBtn.addEventListener('click', minusBtnClick);
});

/* Clear Entire Order */
let clearOrder = function () {
  // bagOrderCount.style.display = 'none';
  data.style.paddingLeft = '0rem';

  orderPlusBtn.forEach(function (btn) {
    btn.removeEventListener('click', plusBtnClick);
  });

  if (data.textContent !== '') {
    setTimeout(() => {
      data.textContent = '';
      let markup = `<p class="js-empty-bag-title">Your bag is empty </p>
      <div class="js-empty-bag-menu-link-wrapper"><a class="js-empty-bag-menu-link" href="wingFiestaMenu.html">Go to Menu</a></div>
      `;
      data.innerHTML += markup;

      count = 0;
      orderCount.forEach(item => {
        item.textContent = 0;
      });
      orderPrices = 0;
      orderTotal.forEach(item => {
        item.textContent = `$${orderPrices.toFixed(2)}`;
      });
      calculateTax = 0;
      tax.textContent = `$${calculateTax.toFixed(2)}`;
      subTotal.textContent = '$0.00';
      checkoutOrderCount.textContent = 0;
      checkOutBtn.style.opacity = '50%';
      checkOutBtn.style.cursor = 'default';
      checkOutBtn.style.marginBlockEnd = '2rem';
      document.querySelector('.order-total-wrapper').style.marginBlockStart =
        '2rem';

      bagOrderCount.style.display = 'none';
    }, 300);
  }
};

orderClear.addEventListener('click', function () {
  clearOrder();
  orderClear.style.cursor = 'default';
  orderClear.style.opacity = '50%';
});

let copyClearOder = clearOrder;

/* Submit Order */
const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
});

minusBtnClick = function () {
  copyMinusBtnClick();

  if (count === 0 && abc <= 0) {
    clearOrder();
    orderClear.style.cursor = 'default';
    orderClear.style.opacity = '50%';
  }
};

clearOrder = function () {
  copyClearOder();
  addBtns.forEach(item => {
    item.classList.remove('clicked');
    item.style.opacity = '100%';
    item.classList.remove('disable-hover');
    item.style.cursor = 'pointer';
  });
};

/* Add add-on items to order */
const addBtns = document.querySelectorAll('.add-ons-cards-btns');
let addOnsArray = [];
let newTotal;
let addOnPriceNum;

let addOnPriceNumArr = [];
let copyAddOnPriceNumArr = [];

let addOnSum;
let abc;

//----------------------------------------------------------//

// const card = addBtn.closest('.add-on-cards');
// const paragraphs = card.querySelectorAll('.add-ons-info-wrapper p');

let addOns = [
  {
    name: '3 Ribs',
    tag: 'ribs',
    price: 6,
    inCart: 0,
  },
  {
    name: 'Sweet Iced Tea',
    tag: 'icedtea',
    price: 3,
    inCart: 0,
  },
  {
    name: '2 Pcs Tenders',
    tag: 'tenders',
    price: 5,
    inCart: 0,
  },
  {
    name: 'Garlic Fries',
    tag: 'garlicfries',
    price: 7,
    inCart: 0,
  },
  {
    name: '1 Liter Coke',
    tag: 'coke',
    price: 4,
    inCart: 0,
  },
  {
    name: 'Cheese Sauce',
    tag: 'cheesesauce',
    price: 1,
    inCart: 0,
  },
];

function addOnsNumbers(addOns) {
  console.log('The food added is', addOns);
  addOns.inCart = 1;
  const markup = `
  <div class="js-add-ons-container">
    <div>
      <span class="js-add-on-items">${addOns.name}</span>
      <span>($${addOns.price.toFixed(2)})</span>
    </div>
    <div class="js-add-ons-btns-wrapper">
      <button class="js-add-ons-count-btns js-add-ons-minus">&minus;</button>
      <span class="js-add-ons-count">${addOns.inCart}</span>
      <button class="js-add-ons-count-btns js-add-ons-plus">&plus;</button>
    </div>
  </div>`;
  data.innerHTML += markup;

  let addOnsCount = Number(localStorage.getItem('addOnsNumbers'));
  let mainItemsCount = Number(localStorage.getItem('mainOrderCount'));

  if (addOnsCount) {
    localStorage.setItem('addOnsNumbers', addOnsCount + 1);
    console.log(addOnsCount);
    console.log(count);
    // checkoutOrderCount.textContent = mainItemsCount += 1;
    // checkoutOrderCount.textContent = mainItemsCount += addOnsCount;
  } else {
    localStorage.setItem('addOnsNumbers', 1);
    // checkoutOrderCount.textContent = mainItemsCount + addOnsCount;
  }

  const addOnsPlusBtns = document.querySelectorAll('.js-add-ons-plus');
  const addOnsMinusBtns = document.querySelectorAll('.js-add-ons-minus');

  let tt = 1;
  addOnsPlusBtns.forEach(function (addOnsPlusBtn) {
    addOnsPlusBtn.addEventListener('click', function () {
      let addOnsCount = Number(localStorage.getItem('addOnsNumbers'));

      addOnsCount += 1;

      addOns.inCart += 1;
      console.log(addOns);

      localStorage.setItem('addOnsNumbers', addOnsCount);

      let addOnsCountElement =
        this.parentElement.querySelector('.js-add-ons-count');
      let currentCount = parseInt(addOnsCountElement.textContent);
      addOnsCountElement.textContent = currentCount + 1;
      tt++;
      console.log(tt, 'AN');

      // Update the total count
      checkOutTotalCount();
    });
  });

  addOnsMinusBtns.forEach(function (addOnsMinusBtn) {
    addOnsMinusBtn.addEventListener('click', function () {
      let addOnsCount = Number(localStorage.getItem('addOnsNumbers'));

      addOnsCount -= 1;

      addOns.inCart -= 1;
      console.log(addOns);

      // if (addOns.inCart === 0) {
      //   document.querySelectorAll('.js-add-ons-container').forEach(item => {
      //     item.style.backgroundColor = 'red';
      //     console.log('YAYAUUU');
      //   });
      // }

      localStorage.setItem('addOnsNumbers', addOnsCount);

      let addOnsCountElement =
        this.parentElement.querySelector('.js-add-ons-count');
      let currentCount = parseInt(addOnsCountElement.textContent);
      addOnsCountElement.textContent = currentCount - 1;

      tt--;
      console.log(tt, 'AN');
      if (tt === 0) {
        this.parentElement.parentElement.style.display = 'none';
        // document.querySelectorAll('.js-add-ons-container').forEach(item => {
        //   item.style.backgroundColor = 'red';
        //   console.log('YAYAUUU');
        // });
      }

      // -------------------- try to figure out how to only have this happen for the addOnCount that is clicked. When two add ons are added and one of them is zero they're both changed
      if (tt <= 0) {
        addBtns.forEach(item => {
          item.classList.remove('clicked');
          item.style.opacity = '100%';
          item.classList.remove('disable-hover');
          item.style.cursor = 'pointer';
          item.addEventListener('click', clickHandler);
          document.querySelectorAll('.js-add-ons-container').forEach(item => {
            item.style.display = 'none';
          });
        });
      }
      // Update the total count
      checkOutTotalCount();
    });
  });
}

let clickHandler;
for (let i = 0; i < addBtns.length; i++) {
  clickHandler = () => {
    // addOnsNumbers(addOns[i]);
    // checkOutTotalCount();

    if (!addBtns[i].classList.contains('clicked')) {
      addBtns[i].classList.add('clicked');
      addBtns[i].style.cursor = 'default';
      addBtns[i].classList.add('disable-hover');
      addBtns[i].style.opacity = '50%';
      console.log(addOns[i], 'UUU');

      addOns[i].inCart = 1;
      addOnsNumbers(addOns[i]);

      // if (addOns[i].inCart === 0) {
      //   document.querySelectorAll('.js-add-ons-container').forEach(item => {
      //     item.style.display = 'none';
      //     console.log('YAYAUUU');
      //   });
      // }

      checkOutTotalCount();
      // cartNumbers();
      // Remove the event listener
      addBtns[i].removeEventListener('click', clickHandler);
    }
  };

  // Attach the event listener
  addBtns[i].addEventListener('click', clickHandler);
}

plusBtnClick = function () {
  copyPlusBtnClick();
  checkOutTotalCount();
};

minusBtnClick = function () {
  let addOnsCount = Number(localStorage.getItem('addOnsNumbers'));
  let mainItemsCount = Number(localStorage.getItem('mainOrderCount'));

  if (mainItemsCount <= 1 && addOnsCount === 0) {
    clearOrder();
    orderClear.style.cursor = 'default';
    orderClear.style.opacity = '50%';
  }

  copyMinusBtnClick();
  checkOutTotalCount();
};

function checkOutTotalCount() {
  let mainItemsCount = Number(localStorage.getItem('mainOrderCount'));
  let addOnsCount = Number(localStorage.getItem('addOnsNumbers'));
  const totalCount = addOnsCount + mainItemsCount;
  localStorage.setItem('totalCount', totalCount);
  checkoutOrderCount.textContent = totalCount;
}
checkOutTotalCount();

//----------------------------------------------------------//
