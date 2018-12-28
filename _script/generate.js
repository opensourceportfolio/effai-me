const fs = require('fs');
const previews = require('./preview.json');

function uniqBy(pred, list) {
  return [...new Map(list.map(item => [pred(item), item])).values()];
}

const uniquePreviews = uniqBy(preview => preview.title, previews);
const guids = uniquePreviews.map(p => p.guid.slice(-10));

const articles = fs.readdirSync('../public/posts/');
const missingArticles = articles.filter(article => guids.every(g => article.indexOf(g) === -1));

console.log('guids: ', guids.length);
console.log('uniquePreviews: ', uniquePreviews.length);
console.log('articles: ', articles.length);
console.log('missingArticles: ', missingArticles.length);
console.log('missingArticles: ', missingArticles);
