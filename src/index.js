const serve = require("express");
const app = serve();
const port = process.env.PORT || 5002;
const {route} = require('./router/index');

/*app.use(serve.json());
app.use(serve.urlencoded({extended:false}));*/
app.use(route);



/**
 * Init server
 */
app.listen(port, () => {
  console.log("Se creo el servidor!");
});
