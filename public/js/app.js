console.log('Client side javascript file is loaded!')

function fetchCityData (city) {
    fetch(`/weather?address=${city}`).then((res) => {   
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector("#message-two");



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetchCityData(location)
})