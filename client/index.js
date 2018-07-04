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
    })
    .then((repoInfo) => {
      let promiseArray = repoInfo.map((repo) => {
        // fetch on commitUrl
        let commitUrl = repo.commits_url.slice(0,repo.commits_url.length - 6);
        return fetch(`${commitUrl}?access_token=${token}`, {
          mode:'cors'
        }).then((response) => {
          return response.json();
        });
      })
      return Promise.all(promiseArray).then((repos) => {
        console.log(repos)
        // concat repos array and filter by author and .length
        let commitCounts = repos.reduce((acc, value) => {
          return acc.concat(value)
        }, []).filter((x) => {
          return x.commit.author.name === userInfo.login
        }).length;
         let transformation = repos; // transform
        document.getElementById('numberofcommits').innerHTML = commitCounts;
        return transformation;
      })
    })
    //   return repoArray;
    // }).then((repoArray) => {
    //   let result = counter(startDate, repoArray, userInfo.login);
    //   document.getElementById('numberofcommits').innerHTML = result;
    // })
  })
  .catch(error => console.error(error));


  
})