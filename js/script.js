"use strict"

const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e) {
  e.preventDefault();
  const error = formValidate(form); 
  const formData = new FormData(form);
  
  if (error === 0) {
    let response = await fetch({
      method: 'POST',
      url: '../sendmail.php',
      body: formData
    });
    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
      console.log('Отправлено!')
    } else {
      console.log('Ошибка');
    }
    return;
  }
  console.log('Заполните обязательные поля');
};

function formValidate(form) {
  let error = 0;
  const formReq = document.querySelectorAll('._req')

  formReq.forEach((input) => {
    formRemoveError(input);

    if (input.classList.contains('_email')) {
      if (emailTest(input)) {
          formAddError(input);
          error++;
      }
    } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
    } else if (input.value === '') {
        formAddError(input);
        error++;
    } 
  });

  return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
} 
//функция теста e=mail
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
