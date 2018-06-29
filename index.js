const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// app.get('/', (req, res) => {
//   res.cookie('session!', 'shouldbeencrypted');
//   return res.sendFile(__dirname + '/client/index.html');
// })

app.get("/auth", (req, res) => {
  let code = req.query.code;
  console.log(code);
  res.sendFile(__dirname + '/client/index.html');
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