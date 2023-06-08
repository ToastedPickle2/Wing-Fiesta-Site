document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const mainLogo = document.querySelector('.home-pg-logo');
  const hamburger = document.querySelector('.hamburger-icon');
  const navMenu = document.querySelector('.nav-links-wrapper');
  const popUpOrderBox = document.querySelector('.add-to-order-container');
  const popUpBG = document.querySelector('.add-to-order-background');
  const popUpOrderBtn = document.querySelector('.add-to-order-btn');

  const modal = document.querySelector('#modal');
  const openModal = document.querySelector('.menu-box-1');
  const closeModal = document.querySelector('.close-button');

  openModal.addEventListener('click', () => {
    if (!modal.hasAttribute('open')) {
      modal.showModal();
    }
  });

  closeModal.addEventListener('click', () => {
    if (modal.hasAttribute('open')) {
      modal.removeAttribute('open');
      console.log('Dialog closed');
    }
  });

  // openModal.addEventListener('click', () => {
  //   modal.classList.add('open');
  // });

  // closeModal.addEventListener('click', () => {
  //   modal.classList.remove('open');

  //   modal.hide();
  //   console.log('test');
  // });

  mainLogo.addEventListener('click', function () {
    window.location.href = 'wingFiesta.html';
  });

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('hide');
  });

  /* Form */
  const form = document.getElementById('form');
  //   const WFInputs = document.querySelectorAll('#WF-inputs');
  //   const WFLabels = document.querySelectorAll('#wing-flavors-options');
  let selectedOptions;
  let totalOrders = [];
  let orderPrices = [];
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    selectedOptions = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked')
    ).map(checkbox => Number(checkbox.value));

    if (
      selectedOptions.length > 4 ||
      (selectedOptions.length < 4 &&
        selectedOptions[selectedOptions.length - 1] >= 15)
    ) {
      alert('Please select 3 flavors.');
      popUpOrderBtn.style.opacity = '50%';
    }
    if (
      selectedOptions.length === 4 &&
      selectedOptions[selectedOptions.length - 1] >= 15
    ) {
      console.log(selectedOptions);
      console.log(getFlavorsDescription(selectedOptions));
      console.log(selectedOptions[selectedOptions.length - 1]);
      popUpOrderBtn.style.opacity = '100%';
      form.reset();

      const json = JSON.stringify(selectedOptions);
      localStorage.setItem('form', json);

      window.location.href = 'wingFiestaMyOrder.html';
      totalOrders.push([selectedOptions]);
      console.log(totalOrders);
      const jsonCopy = JSON.stringify(totalOrders);
      localStorage.setItem('forma', jsonCopy);

      if (selectedOptions[selectedOptions.length - 1] === 15) {
        orderPrices.push(20);
      } else {
        orderPrices.push(25);
      }
      const json3 = JSON.stringify(orderPrices);
      localStorage.setItem('orderPricesForm', json3);
      console.log(orderPrices);
    } else if (
      selectedOptions.length <= 4 &&
      selectedOptions[selectedOptions.length - 1] < 15
    ) {
      alert('Please select type of wing.');
      popUpOrderBtn.style.opacity = '50%';
    }
  });

  function getFlavorsDescription(selectedOptions) {
    let arr = [];
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
    for (const x of selectedOptions) {
      arr.push(flavorsKey[x]);
    }
    return arr;
  }

  /* To allow only one type of wing choice to be selected. */
  const checkboxes = document.querySelectorAll('.wing-flavors-choice');

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
});
