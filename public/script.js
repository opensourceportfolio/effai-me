function extractContent(html) {
  return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
}

function template({ date, thumbnail, preview, link, title, creator }) {
  const dateOpt = { day: 'numeric', month: 'short' };
  const logo_url = 'https://effai.me/favicon.ico';
  const thumbnailUrl = thumbnail || logo_url;

  return `
    <div class="blog">
      <header>
        <h4 class="blog__date">${date.toLocaleString('en-US', dateOpt)}</h4>
        <img class="blog__thumbnail" src="${thumbnailUrl}">
      </header>
      <div class="blog__content">
        <h4>
          <a class="blog__link" href="${link}">
            ${title}
          </a>
        </h4>
        <div class="blog__author">
          <span>By ${creator}</span>
        </div>
        <p class="blog__preview">${preview}...</p>
      </div>
    </div>
    `;
}

function getJson(request) {
  return request.then(res => (res.ok ? res.json() : []));
}

window.onload = async function() {
  const $content = document.querySelector('.blog__layout');
  const rss_url = 'https://medium.com/feed/effai-me';

  const previews = await getJson(fetch(`res.json`));

  const data = previews
    .map(({ pubDate, preview, link, title, creator, thumbnail }) => {
      const date = new Date(Date.parse(pubDate));

      return { date, thumbnail, preview, link, title, creator };
    })
    .sort(function(f, s) {
      return Number(s.date) - Number(f.date);
    });

  const templates = data.map(template);

  $content.innerHTML = templates.join('');
};
