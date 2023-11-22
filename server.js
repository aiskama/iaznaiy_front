require("dotenv").config();
const { isProd, readyPromise, app, render } = require("./config/helpers");

app.post("/token", (req, res) => {
  req.session.apollo_token = req.body.token;
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  if (isProd) {
    render(req, res);
  } else {
    readyPromise.then(() => render(req, res));
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[Info] Сервер запущен на http://127.0.0.1:${port}]`);
});
