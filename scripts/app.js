const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('.time');

const icon = document.querySelector('.icon img');

const updateUI = (data) =>
{
const cityDets = data.citycode;
const weather = data.weather;

//update day/night image

let timesource=null;
const day_night = weather.IsDayTime;

if (day_night) {
  timesource = 'img/day.svg';
  document.body.style.backgroundColor='#ccc';

}
else {
  timesource = 'img/night.svg';
  document.body.style.backgroundColor='#262626';
}
time.setAttribute('src',timesource);


//update icon
const baseIconUrl='https://www.accuweather.com/images/weathericons/';
icon.setAttribute('src',baseIconUrl+weather.WeatherIcon+'.svg');

//update details template;

details.innerHTML=
`<h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">
    ${weather.WeatherText}
  </div>
  <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
  </div>`;

  //remove d-none class
  if (card.classList.contains('d-none')) {
      card.classList.remove('d-none');
  }
}
const updateCity = async (city) =>
{
const citycode = await getCity(city);
const weather = await getWeather(citycode.Key);
return {citycode,
weather};
}
cityForm.addEventListener('submit',e=>{
  e.preventDefault();

  const loc = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI

  updateCity(loc).then(data=>updateUI(data)).catch(error=>console.log(error));

});
