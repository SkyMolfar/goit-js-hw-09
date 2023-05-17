import * as notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


const form = document.querySelector('.form');

// Обробник події для сабміту форми
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Отримуємо значення з полів форми
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  // Запускаємо створення промісів
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
