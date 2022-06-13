const express = require('express');
const cors = require('cors');
const { getArticles, getArticleContent } = require('./puppeteer');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//start server

// let url = 'https://en.wikinews.org/wiki/Main_Page';
// let url2 =
//   'https://en.wikinews.org/wiki/Brothers_Sunshine_Coast_pick_up_first_win_in_senior_rugby_at_Australia%27s_University_of_the_Sunshine_Coast?dpl_id=2947131';

app.get('/getArticles', (req, res) => {
  getArticles('https://en.wikinews.org/wiki/Main_Page').then((data) =>
    res.send(data),
  );
});
app.get('/getArticleContent', (req, res) => {
  let { url } = req.body;
  console.log(req.body);
  getArticleContent(url).then((data) => res.send(data));
});

app.listen(4000, () => console.log('the server is running at port 4000'));
