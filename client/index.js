import { counter } from './counter.js';
import { sampleArrayOfRepos } from './example.sampledata.js';


const countButton = document.getElementById('count');
const startDate = "2018-05-01T00:00:21Z";
const userName = "Corey";

function cookieToObject(str) {
  let allCookies = str.split('; ');
	let cookieObj = {};
  for (let i = 0; i < allCookies.length; i++) {
    let [key,val] = allCookies[i].split('=');
    cookieObj[key] = val;
  }
	return cookieObj;
};

countButton.addEventListener('click', () => {
  let cookieObj = cookieToObject(document.cookie);
  let token = cookieObj.authToken;
  fetch(`https://api.github.com/user?access_token=${token}`, {
    mode: 'cors'
  }).then((response) => {
    return response.json();
  }).then((userInfo) => {
    console.log(userInfo.login);
    fetch(`https://api.github.com/users/${userInfo.login}/repos?access_token=${token}`, {
      mode: 'cors' 
    }).then((response) => {
      return response.json();
    }).then((repoInfo) => {
      console.log(repoInfo);
    })
  })
  .catch(error => console.error(error));



  let result = counter(startDate, sampleArrayOfRepos, userName);
  document.getElementById('numberofcommits').innerHTML = result;
})