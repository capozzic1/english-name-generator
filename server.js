const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const babyNames = require('usbabynames');
let dataToSend = [];
var Promise = require("bluebird");

app.use(express.static('src/client'));

app.get('/names', (req, res) => {

Promise.all([names('M'), names('F')]).then((data) =>{
res.json(dataToSend);
  })

});

function names(gender) {
  let names;
  return names = babyNames.get({sex: gender,
  rankRange:{start:1, end: 500}})
  .then((data) => {
    for (let i = 0, len=100; i <= len; i++){
      dataToSend.push(data[i]);
    }

  })
}

app.listen(port, () => {
  console.log("Server is listening on " + port);
})
