const slides = document.querySelectorAll(".slider .group");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const imgId = document.querySelector(".img-id");
const galleryContainer = document.querySelector(".gallery-container");
const closeBtn = document.querySelector(".closeBtn");
const overly = document.querySelector(".overly");
const fulscrIcon = document.querySelector(".ful-scrn");
const fullScreenImage = document.querySelector(".fullScreenImage");

galleryContainer.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`;

let currentSlide = 0;
updateSliderControl();

function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  //Add active class to the new slide
  slides[currentSlide].classList.add("active");
  // Update slide controls
  updateSliderControl();
  // update thumbnail active state
  thumActivStat(n);
}
prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
});
nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
});

function updateSliderControl() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  imgId.innerHTML = `${currentSlide + 1} / ${slides.length}`;
}

slides.forEach((img, index) => {
  const thumnail = img.cloneNode();
  thumnail.addEventListener("click", () => {
    goToSlide(index);
  });
  galleryContainer.appendChild(thumnail);
});

function thumActivStat(index) {
  galleryContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}
closeBtn.addEventListener("click", () => {
  overly.classList.toggle("hidden");
  fullScreenImage.classList.remove("animated");
});

fulscrIcon.addEventListener("click", () => {
  overly.classList.remove("hidden");
  fullScreenImage.src = `./img/image${currentSlide + 1}.jpg`;
  fullScreenImage.classList.add("animated");
});