console.log('client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  const url = '/weather?address=' + encodeURIComponent(location);
  message1.textContent = 'Loading...';
  message2.textContent = '';
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      }
      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
});
