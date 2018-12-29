const fs = require('fs');
const jsdom = require('jsdom');
const glob = require('glob');
const previews = require('./preview.json');
const { JSDOM } = jsdom;

function uniqBy(pred, list) {
  return [...new Map(list.map(item => [pred(item), item])).values()];
}

function getUrl(guid, posts) {
  return posts.find(p => p.indexOf(guid) > -1);
}

glob('public/**/*.html', (err, posts) => {
  const uniquePreviews = uniqBy(preview => preview.title, previews);
  const formattedPreviews = uniquePreviews.map(p => {
    const guid = p.guid.replace('https://medium.com/p/', '');
    const preview = JSDOM.fragment(p['content:encoded']).textContent.slice(0, 120);
    const img = JSDOM.fragment(p['content:encoded']).querySelector('img[src$="jpeg"]');
    const thumbnail = img ? img.src : null;
    return {
      creator: p.creator,
      title: p.title,
      link: (getUrl(guid, posts) || p.link).replace('public/', ''),
      pubDate: p.pubDate,
      guid,
      preview,
      categories: p.categories,
      thumbnail,
    };
  });
  fs.writeFileSync('_script/res.json', JSON.stringify(formattedPreviews));
});
