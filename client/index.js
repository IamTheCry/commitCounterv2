import { counter } from './counter.js';
import { sampleArrayOfRepos } from './example.sampledata.js';
import { token } from './authToken.js';


const countButton = document.getElementById('count');
const startDate = "2018-05-01T00:00:21Z";
const userName = "Corey";

countButton.addEventListener('click', () => {
  fetch('/repos' + token, {
    mode: 'cors'
  }).then((response) => console.log(response))
  .catch(error => console.error(error))

  let result = counter(startDate, sampleArrayOfRepos, userName);
  document.getElementById('numberofcommits').innerHTML = result;
})