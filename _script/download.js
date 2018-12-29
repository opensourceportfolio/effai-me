const fs = require('fs');
const request = require('./request');
const Parser = require('rss-parser');
const parser = new Parser();

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
  'Knowledge',
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
  const prev = await promise;
  const current = await parser.parseURL(`${rss_url}${tag}`);

  if (!current.items) {
    console.log(tag);
    console.log(current);
  }

  return [...prev, ...current.items];
}, Promise.resolve([]));

previews.then(p => {
  fs.writeFileSync('preview.json', JSON.stringify(p));
});
