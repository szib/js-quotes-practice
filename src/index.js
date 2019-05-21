// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const URL = 'http://localhost:3000/quotes';
const quotesListEl = document.querySelector('#quote-list');
const newQuoteForm = document.querySelector('#new-quote-form');

const api = (url, options = {}) => fetch(url, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.json());
  });

const quoteListEl = (quote) => {
  const li = document.createElement('li');
  li.classList.add('quote-card');
  li.dataset.id = quote.id;
  li.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `;
  const deleteBtn = li.querySelector('.btn-danger');
  deleteBtn.addEventListener('click', (e) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    api(`${URL}/${quote.id}`, options)
      .then(quotesListEl.removeChild(li));
  });
  const likeBtn = li.querySelector('.btn-success');
  likeBtn.addEventListener('click', (e) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: ++quote.likes,
      }),
    };

    api(`${URL}/${quote.id}`, options)
      .then((json) => {
        likeBtn.innerHTML = `Likes: <span>${json.likes}</span>`;
      });
  });
  return li;
};

const parseQuotes = (quotes) => {
  quotes.forEach(quote => quotesListEl.appendChild(quoteListEl(quote)));
};

const handleNewClickSubmit = (event) => {
  event.preventDefault();
  const quote = {
    author: newQuoteForm.author.value,
    likes: 0,
    quote: newQuoteForm['new-quote'].value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
  };

  api(URL, options)
    .then(returnedQuote => quotesListEl.appendChild(quoteListEl(returnedQuote)));
};

const init = () => {
  console.log('¯\\_(ツ)_/¯ init...');
  api(URL)
    .then(parseQuotes)
    .catch(console.err);

  newQuoteForm.addEventListener('submit', handleNewClickSubmit);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
