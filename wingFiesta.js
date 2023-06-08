'use strict';

const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.nav-links-wrapper');
const banner = document.querySelector('.banner-image-wrapper');
const mainLogo = document.querySelector('.home-pg-logo');
const orderBtn = document.querySelector('.main-pg-order-btn');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('hide');
});

banner.addEventListener('click', function () {
  window.location.href = 'wingFiestaMenu.html';
});

mainLogo.addEventListener('click', function () {
  window.location.href = 'wingFiesta.html';
});

orderBtn.addEventListener('click', function () {
  window.location.href = 'wingFiestaMenu.html';
});
