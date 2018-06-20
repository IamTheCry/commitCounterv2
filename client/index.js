const loginButton = document.getElementById('login');
loginButton.addEventListener('click', (e) => {
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

const startDate = "2018-05-01T00:00:21Z"

const countButton = document.getElementById('count');
countButton.addEventListener('click', (e) => {
  /* from sample data 
  go through each repo
    for each repo, go through each commit
      if committer name matches user name
      && is after the 'startDate' increment counter by 1
  */
})