const cursor = document.querySelector('.customcursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.addEventListener('DOMContentLoaded', () => {
  const cards1 = document.querySelectorAll('.models-grid1 .model-card[data-index]');

  const [c0, c1, c2] = cards1;

  const getProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
  };

  const update = () => {
    const p = getProgress();

    if (p < 0.1) {
      c0.style.order = 0;
      c1.style.order = 1;
      c2.style.order = 2;
    } else {
      c0.style.order = 2;
      c1.style.order = 0;
      c2.style.order = 1;
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards2 = document.querySelectorAll('.models-grid2 .model-card[data-index]');

  const [c3, c4, c5, c6, c7, c8, c9, c10, c11] = cards2;

  const getProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
  };

  const update = () => {
    const p = getProgress();
   
    if (p < 0.3) {
   
      c3.style.order = 0;
      c4.style.order = 1;
      c5.style.order = 2;
      c6.style.order = 3;
      c7.style.order = 4;
      c8.style.order = 5;
      c9.style.order = 6;
      c10.style.order = 7;
      c11.style.order = 8;
    } else if ( p < 0.5) {
      
      c3.style.order = 2;
      c4.style.order = 0;
      c5.style.order = 1;
      c6.style.order = 3;
      c7.style.order = 4;
      c8.style.order = 5;
      c9.style.order = 6;
      c10.style.order = 7;
      c11.style.order = 8;
    } else if ( p < 0.7 ) {
      c3.style.order = 2;
      c4.style.order = 0;
      c5.style.order = 1;
      c6.style.order = 4;
      c7.style.order = 3;
      c8.style.order = 6;
      c9.style.order = 5;
      c10.style.order = 7;
      c11.style.order = 8;
    } else if (p < 0.9) {

      c3.style.order = 2;
      c4.style.order = 0;
      c5.style.order = 1;
      c6.style.order = 4;
      c7.style.order = 3;
      c8.style.order = 6;
      c9.style.order = 5;
      c10.style.order = 8;
      c11.style.order = 7;
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
});

const pages = document.querySelectorAll('.page1, .page2, .page3, .page4, .page5, .page6');

function updatePageAnimations() {
  pages.forEach((page, index) => {
    const rect = page.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1.6 - (rect.top / windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    const delay = 0.03;
    const adjustedProgress = Math.max(0, progress - delay);


    const shouldBeFlat = progress >= 0.95;
    const rotateValue = shouldBeFlat ? 0 : (15 - 15 * progress);


    const scaleValue = 0.9 + 0.1 * progress;

    const translateYValue = 650 - 650 * adjustedProgress;

    if (index === 0) {
      page.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
      page.style.opacity = 1;
    } else {
      page.style.transform = `
        translateY(${translateYValue}px)
        rotate(${rotateValue}deg)
        scale(${scaleValue})
      `;
    }

    page.style.zIndex = 10 + index;
  });
}

window.addEventListener('scroll', updatePageAnimations);
window.addEventListener('resize', updatePageAnimations);
updatePageAnimations();

document.addEventListener('DOMContentLoaded', function () {

  const sizeButtons = document.querySelectorAll('.sizebuttons-container button');

  sizeButtons.forEach(button => {
    button.addEventListener('click', function () {
    
      sizeButtons.forEach(btn => btn.classList.remove('active'));

    
      this.classList.add('active');

      const selectedSize = this.textContent.trim();
      console.log('Выбран размер:', selectedSize);

      const container = document.querySelector('.sizebuttons-container');
      if (container) {
        container.setAttribute('data-selected-size', selectedSize);
      }
    });
  });
});

const triggerBtn = document.getElementById('buyTrigger');
const modal = document.getElementById('bluring');
const form = document.getElementById('orderform');


triggerBtn.addEventListener('click', () => {
  modal.classList.add('active');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('active');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value
  };


  console.log('Заказ:', data);


  form.reset();
  modal.classList.remove('active');
});

