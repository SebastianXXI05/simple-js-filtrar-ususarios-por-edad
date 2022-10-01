const radioBtns = document.querySelectorAll('input[name="edad-radio"]')
const result = document.querySelector('#result')

const display = (data) => {
  return (
    `<div>
    <p>Nombre: <b>${data.nombre}</b></p>
    <p>Edad: <b>${data.edad}</b></p>
    </div>
  `
  )
}

const resulted = (valueRadio) => {
  result.innerHTML = ''
  fetch('users.json')
    .then(res => res.json())
    .then(data => {
      if (valueRadio === 'all') {
        data.map(user => result.innerHTML += display(user))
      }
      else if (valueRadio === 'max18') {
        const find = data.filter(user => user.edad >= 18)
        find.map(user => result.innerHTML += display(user))
      }
      else {
        const find = data.filter(user => user.edad < 18)
        find.map(user => result.innerHTML += display(user))
      }
    })
    .catch(err => console.log(err))
}

resulted(radioBtns[0].value)

radioBtns.forEach(radioBtn => {
  const select = () => {
    const selected = document.querySelector('input[name="edad-radio"]:checked')
    resulted(selected.value)
  }

  radioBtn.addEventListener('click', select)
})