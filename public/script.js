function extractContent(html) {
  return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
}

function template({ date, thumbnail, preview, link, title, author }) {
  const dateOpt = { day: 'numeric', month: 'short' };

  return `
    <div class="blog">
      <header>
        <h4 class="blog__date">${date.toLocaleString('en-US', dateOpt)}</h4>
        <img class="blog__thumbnail" src="${thumbnail}">
      </header>
      <div class="blog__content">
        <h4>
          <a class="blog__link" href="${link}">
            ${title}
          </a>
        </h4>
        <div class="blog__author">
          <span>By ${author}</span>
        </div>
        <p class="blog__preview">${preview}...</p>
      </div>
    </div>
    `;
}

window.onload = async function() {
  const $content = document.querySelector('.blog__layout');
  const parameters = {
    rss_url: 'https://medium.com/feed/effai-me',
  };
  const params = Object.entries(parameters).map(([key, val]) => `${key}=${val}`).join('&');

  const response = await fetch(`https://api.rss2json.com/v1/api.json?${params}`);

  if (response.ok) {
    const json = await response.json();
    const data = json.items.map(({ pubDate, description, link, title, author, thumbnail }) => {
      const date = new Date(Date.parse(pubDate));
      const preview = extractContent(description).slice(0, 120);

      return { date, thumbnail, preview, link, title, author };
    });

    const templates = data.map(template);

    $content.innerHTML = templates.join('');
  }
};
