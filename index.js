const express= require('express')
const app = express()
const port = 3000;
var mustacheExpress = require('mustache-express')
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.json());
app.get('/', function (req, res) {
  res.render('echo', {});
});

app.get('/foo', function (req, res) {
    res.json({"foo": "bar"});
});

app.use(express.urlencoded({
  extended: true
}));

app.post('/bar', function(req, res) {
  var bodys = req.body;
  var id = bodys.id;
  delete bodys.method;
  var params =  bodys.params;
  var body = {
    id: ++id,
    result: params
  };
  console.log(JSON.stringify(body));
  res.send(body);
});
