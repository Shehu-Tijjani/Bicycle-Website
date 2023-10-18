"use strict";

const hamburger = document.querySelector(".hamburger");
const hamburgerWrap = document.querySelector(".hamburger__wrap");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamStrp = document.querySelector(".hamburger-stripe");
const nav = document.querySelector(".nav");
const navLists = document.querySelector(".nav__lists");
const navLinks = document.querySelectorAll(".nav__link");
const headerLogo = document.querySelector(".header__logo");
const hamShadow = document.querySelector(".ham__backshadow");
const header = document.querySelector(".header");
const productLikeBtn = document.querySelectorAll(".products__icon");

// clicking products like-button
productLikeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("products-liked");
  });
});

// Defaults
nav.style.zIndex = "99990";
hamShadow.style.display = "none";

hamburgerMenu.style.transform = getComputedStyle(hamburgerMenu).transform;

// NAV LIST CLONE FOR HAMBURGER
const cloneNavlists = navLists.cloneNode(true);
cloneNavlists.classList.add("clone__nav__lists");
hamburgerMenu.prepend(cloneNavlists);
cloneNavlists.querySelectorAll(".nav__list").forEach((list) => {
  list.classList.remove("sm--texts");
});

const hamlogo = document.createElement("div");
const hamLogoText = `
<h1 class=" logo">
          CYC<span class="logo-span">LING</span>.bike
        </h1>
`;

hamlogo.insertAdjacentHTML("afterbegin", hamLogoText);
hamlogo.classList.add("ham__logo");

// hamburgerWrap.append(hamlogo);
hamburgerMenu.append(hamlogo);

// HAM LOGO SLIDE LEFT OUT OF SIGHT
hamlogo.style.transition = "all 0.6s ease";
hamlogo.style.transform = "translateX(-150%)";

// HAMBURGER LIST DECO ICON
let hamNavListIcon;

const hamNavListIconSvg = `
<svg>
<use xlink:href="img/sprite.svg#icon-bicycle"></use>
</svg>
`;

const cloneNavList = cloneNavlists.querySelectorAll(".nav__list");
const hambikesiconArr = [];
cloneNavList.forEach((list, i, arr) => {
  hamNavListIcon = document.createElement("div");
  hamNavListIcon.style.fill = "white";
  hamNavListIcon.classList.add("ham-navlist-icon");

  hamNavListIcon.classList.add(`hamNavListIcon${i + 1}`);
  list.prepend(hamNavListIcon);

  hambikesiconArr.push(hamNavListIcon);
  hamNavListIcon.style.zIndex = "77";
  list.prepend(hambikesiconArr[i]);

  hamNavListIcon.innerHTML = hamNavListIconSvg;

  if (i % 2 == 1) {
    hambikesiconArr[i].style.left = "-20%";
  }
  if (i % 2 == 0) {
    hambikesiconArr[i].style.left = "105%";
    hambikesiconArr[i].style.transform = "translateY(-50%) rotateY(180deg)";
  }

  arr[i].addEventListener("mouseover", function () {
    if (i % 2 == 0) {
      hambikesiconArr[i].style.left = "-20%";
      hambikesiconArr[i].querySelector("svg").style.fill =
        "var(--color--secondary)";
    }

    if (i % 2 == 1) {
      hambikesiconArr[i].style.left = "120%";
      hambikesiconArr[i].querySelector("svg").style.fill =
        "var(--color--secondary)";
    }
  });

  list.addEventListener("mouseout", function () {
    if (i % 2 == 0) {
      hambikesiconArr[i].style.left = "105%";
      hambikesiconArr[i].style.transform = "translateY(-50%) rotateY(180deg)";
      hambikesiconArr[i].querySelector("svg").style.fill =
        "var(--color--white)";
    }

    if (i % 2 == 1) {
      hambikesiconArr[i].style.left = "-30%";
      hambikesiconArr[i].style.transform = "translateY(-50%) rotateY(180deg)";
      hambikesiconArr[i].querySelector("svg").style.fill =
        "var(--color--white)";
    }
  });
});

const HamBurgerFunction = function () {
  hamburgerMenu.style.transform = "translateX(-140%)";

  let hamClickCondition = true;

  //  ham animation => animate ✔️
  let anim = true;

  const removeHamShadow = function () {
    hamShadow.style.display = "none";
  };

  const addHamShadow = function () {
    hamShadow.style.display = "block";
  };

  const endHamburgerProcess = function () {
    // Close the hamburger menu
    if (hamClickCondition === false) {
      removeHamShadow();

      // HAM LOGO SLIDE OUT OF SIGHT
      hamlogo.style.transform = "translateX(-150%)";

      // remove hamburger icon
      this.querySelector(".hamburger-stripe").classList.remove("ham-strp");

      // ham animation => animate ✔️
      anim = true;

      // dismiss HAMBURGER slide out
      hamburgerMenu.style.transform = "translateX(-140%)";
    }

    // switching click condition
    hamClickCondition = !hamClickCondition;
  };

  // HAM ANIMATION
  const hamAnimation = function () {
    if (anim) hamStrp.classList.add("ham-hover-anim");
  };

  // HAM INITIATOR
  const initiateHam = function (e) {
    addHamShadow();
    // HAM LOGO SLIDE INTO VIEW
    hamlogo.style.transform = "translateX(0%)";

    // display navigation/hamburger menu
    hamburgerMenu.style.transform = "translateX(-10%)";

    // ham animation => dont animate ❌❌❌
    anim = false;
    hamStrp.classList.remove("ham-hover-anim");

    const hamclicked = e.target.closest(".hamburger");

    // Display hamburger icon
    hamclicked.querySelector(".hamburger-stripe").classList.add("ham-strp");

    endHamburgerProcess.bind(hamburger)();
    // if (hamclicked) removeHamShadow();
  };

  // NAV ANIMATION
  hamburger.addEventListener("mouseover", hamAnimation);
  hamburger.addEventListener("mouseout", function () {
    hamStrp.classList.remove("ham-hover-anim");
  });

  const hamBackdrop = new IntersectionObserver(
    function (entries) {
      const [entry] = entries;

      if (!entry.isIntersecting) {
        removeHamShadow();
      } else {
        addHamShadow();
      }
    },
    {
      root: null,
      threshold: 0,
    }
  ).observe(hamburgerMenu);

  // (MAJOR-TASK) NAV CLICK FUNCTIONALITIES
  hamburger.addEventListener("click", initiateHam);
  hamShadow.addEventListener("click", endHamburgerProcess.bind(hamburger));

  cloneNavlists.addEventListener("click", function (e) {
    // e.preventDefault();
    const ListclickTarget = e.target;

    // console.log(ListclickTarget);
    navLinks.forEach((navlink) => {
      if (ListclickTarget.classList.contains("nav__link")) {
        endHamburgerProcess.bind(hamburger)();
        hamClickCondition = true;
      }
    });
  });
};

HamBurgerFunction();

// scroll page into view
const navLinksFunc = function (e) {
  e.preventDefault();
  const ListclickTarget = e.target.closest(".nav__link");
  if (!ListclickTarget) return;
  const id = ListclickTarget.getAttribute("href");
  document
    .querySelector(`${id}`)
    .scrollIntoView({ behavior: "smooth", block: "start" });
};

[cloneNavlists, navLists].forEach((ev) =>
  ev.addEventListener("click", navLinksFunc)
);

// sticky nav
const navHeight = nav.getBoundingClientRect().height;

const navSticky = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
).observe(header);
