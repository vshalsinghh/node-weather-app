console.log("loading in the javascript");



const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const forecast = document.querySelector('.forecast');
const place = document.querySelector('.place');


weatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    if(input.value){
        forecast.textContent = 'loading...';
        place.textContent='';

        fetch(`/weather?address=${input.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                forecast.textContent = data.error;
                place.textContent = '';
            }
            else{
                forecast.textContent = data.location;
                place.textContent = data.forecast ;
                
            }
        }
        )
    }
    else {
        forecast.textContent='Please Enter an address';
        place.textContent='';
    }
   
})