const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const https = require('https');
const clientSecret = process.env.CLIENTSECRET;
// app.get('/', (req, res) => {
//   res.cookie('session!', 'shouldbeencrypted');
//   return res.sendFile(__dirname + '/client/index.html');
// })

app.get("/auth", (req, res) => {
  let code = req.query.code;
  console.log(code);
  // send code and client secret
  console.log(clientSecret)
  let options = {
    hostname: 'https://github.com',
    path: '/login/oauth/access_token?client_id=d15a7f9f6bd292b7493c&client_secret=' + clientSecret + '&code=' + code,
    method: 'POST'
  }
  // const gitReq = http.get(options, (res) => {
  //   console.log('-------------response------------', res.statusCode,res.statusMessage);
  //   console.log(res.headers);
  //   res.setEncoding('utf8')
  //   res.on('data', (data) => console.log(data));
  // });
  // gitReq.on('error', (e) => {
  //   console.error(`problem with request: ${e.message}`);
  // });
  // gitReq.end();
  let authToken;
  const gitReq = https.get('https://github.com/login/oauth/access_token?client_id=d15a7f9f6bd292b7493c&client_secret=' + clientSecret + '&code=' + code, (gitRes) => {
    
    console.log(gitRes.statusCode);
    console.log(gitRes.statusMessage);
    gitRes.setEncoding('utf8');
    gitRes.on('data', (data) => {
      authToken = data.split('=')[1].split('&')[0];
      res.cookie('authToken',authToken)
      res.sendFile(__dirname + '/client/index.html');
    })
  });
  gitReq.end();
})

app.get("/repos", (req, res) => {
  res.send('repos')
  // client requests repos
})

app.get("/commits", (req, res) => {
  res.send('commits')
  // client requests commit count
})

app.use(express.static(__dirname + '/client'))

app.listen(port, () => console.log('Commit Counter listening on port ' + port))