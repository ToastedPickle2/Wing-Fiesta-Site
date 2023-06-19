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
};

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

  if (count === 0) {
    clearOrder();
    orderClear.style.cursor = 'default';
    orderClear.style.opacity = '50%';
  }
};

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

/* Add add-on items to order */
const addBtns = document.querySelectorAll('.add-ons-cards-btns');
let addOnsArray = [];
let newTotal;
let addOnPriceNum;

let addOnPriceNumArr = [];
let copyAddOnPriceNumArr = [];

let addOnSum;

let abc;
addBtns.forEach(function (addBtn) {
  addBtn.addEventListener('click', function () {
    if (!addBtn.classList.contains('clicked') /*&& count > 0*/) {
      const card = addBtn.closest('.add-on-cards');
      const paragraphs = card.querySelectorAll('.add-ons-info-wrapper p');

      if (count === 0) {
        data.textContent = '';
        orderClear.style.opacity = '100%';
        orderClear.style.cursor = 'pointer';
      }
      for (let i = 0; i < 2 && i < paragraphs.length; i++) {
        const clonedParagraph = paragraphs[i].cloneNode(true);
        const addOnsTextContent = clonedParagraph.textContent;
        addOnsArray.push(addOnsTextContent);
        console.log(addOnsArray);
      }

      let addOnItem = addOnsArray[addOnsArray.length - 2];
      let addOnPrice = addOnsArray[addOnsArray.length - 1];

      console.log(addOnPrice, 'addonPrice');

      let addOnsCount = 1;
      // let addOnsCount = 0;
      let copyCount = count;

      // addOnsCount++;
      bagOrderCount.textContent = count += addOnsCount;
      checkoutOrderCount.textContent = copyCount += addOnsCount;

      const markup = `
      <div class="js-add-ons-container">
        <div>
          <span class="js-add-on-items">${addOnItem}</span>
          <span>(${addOnPrice})</span>
        </div>
        <div class="js-add-ons-btns-wrapper">
          <button class="js-add-ons-count-btns js-add-ons-minus">&minus;</button>
          <span class="js-add-ons-count">${addOnsCount}</span>
          <button class="js-add-ons-count-btns js-add-ons-plus">&plus;</button>
        </div>
      </div>`;

      // Updating SubTotal, Tax, and Total after adding Add-ons
      let regex = /[0-9]/;
      let result = [];
      for (const x of addOnPrice) {
        if (regex.test(x)) {
          result.push(x);
        }
      }

      addOnPriceNum = Number(result[0] + '.' + result[1] + result[2]);
      console.log(addOnPriceNum, 't');

      let currentTotal;
      orderTotal.forEach(item => {
        currentTotal = Number(item.textContent.replace('$', ''));
        newTotal = currentTotal + addOnPriceNum;
        addOnPriceNumArr.push(addOnPriceNum);
        orderPrices = newTotal;
        item.textContent = `$${orderPrices.toFixed(2)}`;
      });

      copyAddOnPriceNumArr.push(addOnPriceNum);

      addOnSum = copyAddOnPriceNumArr.reduce((a, b) => a + b);

      const addOnTax = ((7.25 / 100) * newTotal).toFixed(2);
      tax.textContent = `$${addOnTax}`;
      subTotal.textContent = `$${(newTotal - addOnTax).toFixed(2)}`;

      setTimeout(() => {
        data.innerHTML += markup;

        const addOnsPlusBtns = document.querySelectorAll('.js-add-ons-plus');
        const addOnsMinusBtns = document.querySelectorAll('.js-add-ons-minus');
        const addOnsCountEls = document.querySelectorAll('.js-add-ons-count');

        addOnsPlusBtns.forEach(function (addOnsPlusBtn) {
          addOnsPlusBtn.addEventListener('click', function () {
            const index = Array.from(addOnsPlusBtns).indexOf(addOnsPlusBtn);
            if (addOnsCount < 5) {
              addOnsCount++;
              const copyCount = count - 1;
              const copyCount2 = count - 1;
              bagOrderCount.textContent = copyCount + addOnsCount;
              checkoutOrderCount.textContent = copyCount2 + addOnsCount;

              addOnsCountEls[index].textContent = addOnsCount;
              console.log(addOnPrice, 'TEST');

              let currentTotal;
              orderTotal.forEach(item => {
                currentTotal = Number(item.textContent.replace('$', ''));
                orderPrices = currentTotal + addOnPriceNum;
                item.textContent = `$${orderPrices.toFixed(2)}`;
              });
            }
          });
        });

        addOnsMinusBtns.forEach(function (addOnsMinusBtn) {
          addOnsMinusBtn.addEventListener('click', function () {
            const index = Array.from(addOnsMinusBtns).indexOf(addOnsMinusBtn);
            if (addOnsCount > 0) {
              addOnsCount--;
              console.log('Minus', index);
              addOnsCountEls[index].textContent = addOnsCount;

              abc = addOnsCount;
              console.log(abc);

              let currentTotal;
              orderTotal.forEach(item => {
                currentTotal = Number(item.textContent.replace('$', ''));
                orderPrices = currentTotal - addOnPriceNum;
                item.textContent = `$${orderPrices.toFixed(2)}`;
              });
            }
            if (addOnsCount === 0) {
              document.querySelectorAll('.js-add-ons-container')[
                index
              ].style.display = 'none';
            }
            console.log(addOnsCount, 'DOOO');
            if (addOnsCount <= 0) {
              addBtn.classList.remove('clicked');
              addBtn.style.opacity = '100%';
              addBtn.classList.remove('disable-hover');
              addBtn.style.cursor = 'pointer';
            }
            if (addOnsCount <= 0 && count <= 0) {
              clearOrder();
            }
          });
        });
      }, 200);
      // abc = addOnsCount;
      addBtn.classList.add('clicked');
      addBtn.style.cursor = 'default';
      addBtn.classList.add('disable-hover');
      addBtn.style.opacity = '50%';
    }
  });
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

// let updatedTotal;
// let copyUpdatedTotal;

// orderPlusBtn.forEach(btn => {
//   btn.addEventListener('click', function () {
//     let addOnPriceNumSet = new Set(addOnPriceNumArr);

//     if (count > 0) {
//       let arrCopy = [...addOnPriceNumSet];
//       let result = 0;
//       for (const x of arrCopy) {
//         result += x;
//       }
//       console.log(result);
//       updatedTotal = Number(
//         (copyOrderPrices * count + result * count).toFixed(2)
//       );

//       copyUpdatedTotal = updatedTotal;
//       orderTotal.forEach(item => {
//         item.textContent = `$${updatedTotal.toFixed(2)}`;
//       });
//       console.log(updatedTotal);
//     }
//   });

//   orderMinusBtn.forEach(btn => {
//     btn.addEventListener('click', function () {
//       if (count > 0) {
//         let addOnPriceNumSet = new Set(addOnPriceNumArr);

//         console.log(copyAddOnPriceNumArr, 'YYOOOO');
//         console.log(copyAddOnPriceNumArr.length, 'length');

//         console.log(addOnSum, 'addOnSum');
//         console.log(updatedTotal - addOnSum, 'UP UP');
//         console.log(copyOrderPrices, 'Ovo');

//         let arrCopy = [...addOnPriceNumSet];

//         let result = 0;
//         arrCopy.forEach(x => {
//           result += x;
//         });

//         updatedTotal = Number(
//           (copyOrderPrices * count + result * count).toFixed(2)
//         );

//         console.log(updatedTotal, 'updatedTotal');
//         console.log((copyUpdatedTotal -= updatedTotal), 'OO');
//         orderTotal.forEach(item => {
//           item.textContent = `$${updatedTotal.toFixed(2)}`;
//         });

//         console.log(copyUpdatedTotal, 'SIXX');
//       }
//     });
//   });

//   orderPlusBtn.forEach(btn => {
//     btn.addEventListener('click', function () {
//       if (count >= 0 && count < 25) {
//         count++;
//         // orderCount.textContent = count;
//         orderCount.forEach(item => {
//           item.textContent = count;
//         });
//         checkoutOrderCount.textContent = count;
//         bagOrderCount.textContent = count;
//         bagOrderCount.style.display = 'block';

//         orderPrices += copyOrderPrices;

//         orderTotal.forEach(item => {
//           item.textContent = `$${orderPrices.toFixed(2)}`;
//         });

//         tax.textContent = `$${(calculateTax += copyCalculateTax).toFixed(2)}`;
//         subTotal.textContent = `$${(orderPrices - calculateTax).toFixed(2)}`;
//       }
//     });
//   });
// });
