const fs = require('fs');
const request = require('./request');

const tags = [
  'Advice',
  'Aging',
  'Diet',
  'Early-Retirement',
  'Fasting',
  'Financial-Independence',
  'Finance',
  'Financial-Independence',
  'Fitness',
  'Freedom',
  'Habits',
  'Habit-Building',
  'Happiness',
  'Health',
  'Healthy-lifestyle',
  'House',
  'Housing',
  'Housing-Prices',
  'Inspiration',
  'Intentional-Life',
  'Intentional-Living',
  'Knowledge'
  'Mentorship',
  'Mindfulness',
  'Minimalism',
  'Minimalist',
  'Money',
  'Life',
  'Life-Lessons',
  'Life-Hacking',
  'Old-Age',
  'Politics',
  'Personal-Finance',
  'Productivity',
  'Simple-Living',
  'Saving',
  'Sugar',
  'Taxes',
];

const rss_url = 'https://medium.com/feed/effai-me/tagged/';
const fetch = async (hostname, path) => {
  const res = await request({
    hostname,
    path,
    method: 'GET',
  });

  return JSON.parse(res);
};

const previews = tags.reduce(async (promise, tag) => {
  const host = 'feed2json.org';
  const path = encodeURI(`/convert?url=${rss_url}${tag}`);

  const prev = await promise;
  const current = await fetch(host, path);

  if (!current.items) {
    console.log(tag);
  }

  return [...prev, ...current.items];
}, Promise.resolve([]));

previews.then(p => {
  fs.writeFileSync('preview.json', JSON.stringify(p));
});
