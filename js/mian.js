// nav
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// detail 
function animateCounter(element, target, withPlus = false) {
  let current = 0;
  const speed = target < 10 ? 300 : 50;
  const step = Math.ceil(target / speed);

  const update = () => {
    current += step;
    if (current >= target) {
      element.textContent = withPlus ? `${target}+` : target;
    } else {
      element.textContent = current;
      requestAnimationFrame(update);
    }
  };

  update();
}

function startCounting() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const withPlus = counter.getAttribute('data-plus') === "true";
    animateCounter(counter, target, withPlus);
  });
}

window.addEventListener('load', startCounting);

// motto

 const box = document.querySelector('.box-motto');

  function handleScroll() {
    const rect = box.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      // Elemen dalam viewport
      const progress = 1 - (rect.top / windowHeight);
      const scale = Math.min(1, 0.2 + progress * 0.9); // dari 0.8 ke 1
      const opacity = Math.min(1, progress * 2);       // dari 0 ke 1

      box.style.transform = `scale(${scale})`;
      box.style.opacity = opacity;
    } else {
      // Di luar viewport
      box.style.transform = `scale(0.6)`;
      box.style.opacity = 0;
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);


// carusel car
  const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const carCards = document.querySelectorAll('.car-card');

    let currentIndex = 0;

    function showCard(index) {
        carCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';

            const img = card.querySelector('img');
            if (i === index) {
                // Reset animasi
                img.classList.remove('animate-img');
                void img.offsetWidth; // trik untuk restart animasi
                img.classList.add('animate-img');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carCards.length;
        showCard(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carCards.length) % carCards.length;
        showCard(currentIndex);
    });

    // Inisialisasi
    showCard(currentIndex);


// popup
const popup = document.getElementById("popupDetail");
const closeBtn = document.querySelector(".popup-close");

document.querySelectorAll(".btn-detail").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".car-card");
    document.getElementById("popupTitle").textContent = card.dataset.title;
    document.getElementById("popupKet1").textContent = card.dataset.ket1;
    document.getElementById("popupKet2").textContent = card.dataset.ket2;
    document.getElementById("popupKet3").textContent = card.dataset.ket3;
    popup.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
