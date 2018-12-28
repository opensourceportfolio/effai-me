const https = require('https');

module.exports = function request({ body = '', ...options }) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        ...options,
      },
      res => {
        let chunks = '';
        res.on('data', data => {
          chunks += data;
        });
        res.on('end', () => resolve(chunks));
      }
    );

    req.on('error', reject);
    req.write(body);
    req.end();
  });
};
