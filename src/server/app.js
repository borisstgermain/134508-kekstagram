const express = require(`express`);
const {POSTS} = require(`./routers`);
const imageStore = require(`./images/store`);
const postsStore = require(`./posts/store`);
const postsRouter = require(`./posts/router`)(postsStore, imageStore);

const app = express();

app.use(`/`, express.static(`static`));
app.use(POSTS, postsRouter);

module.exports = app;
