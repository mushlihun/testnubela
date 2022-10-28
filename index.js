const express= require('express')
const app = express()

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.json());
app.get('/foo', function (req, res) {
    res.json({"foo": "bar"});
});

// app.use(express.urlencoded({
//   extended: true
// }));

app.post('/bar', function(req, res) {
  var bodys = req.body;
  var id = bodys.id;
  var params =  bodys.params;
  var body = {
    id: ++id,
    result: params
  };
  console.log(body);
  res.send(body);
});
