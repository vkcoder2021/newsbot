const API_KEY = 'fa219ef2f331464a8e8b62e6196bc6cc';

const fetchNewsHeadlines = async ({ country, category }, sources) => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  let res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`,
    requestOptions,
  );

  let data = await res.json();

  return data.articles;
};

const fetchNewsSources = async ({ country, category, language }) => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  let res = await fetch(
    `https://newsapi.org/v2/top-headlines/sources?country=${country}&category=${category}&language=${language}&apiKey=${API_KEY}`,
    requestOptions,
  );

  let data = await res.json();

  return data.sources;
};

export { fetchNewsHeadlines, fetchNewsSources };
