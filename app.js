var views = require('co-views');
var koa = require('koa');
var app = koa();
var render = views(__dirname + '/views', { ext: 'ejs' });

var user = {
  name: {
    first: 'Yusuke',
    last: 'Nakamura',
  },
  age: 22
};

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
})

app.use(function *(){
  this.body = yield render('user', { user: user });
});

app.listen(8000);
