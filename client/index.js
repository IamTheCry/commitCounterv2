import { counter } from './counter.js';
import { sampleArrayOfRepos } from './example.sampledata.js';


const loginButton = document.getElementById('login');
const countButton = document.getElementById('count');
const startDate = "2018-05-01T00:00:21Z"

loginButton.addEventListener('click', () => {
  fetch('https://github.com/login/oauth/authorize', {
    mode: 'no-cors'
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log('reached the end')
    console.log(myJson);
  });
});

countButton.addEventListener('click', () => {
  let result = counter(startDate, sampleArrayOfRepos);
  document.getElementById('numberofcommits').innerHTML = result;
})