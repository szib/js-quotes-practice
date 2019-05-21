// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const URL = 'http://localhost:3000/quotes';
const quotesListEl = document.querySelector('#quote-list');

const rejectWithError = err => Promise.reject(new Error(`¯\\_(ツ)_/¯ ==> ${err}`));

const fetchQuotes = () => fetch(URL)
  .then(resp => resp.json())
  .catch(err => rejectWithError(err));

const quoteListEl = (quote) => {
  const li = document.createElement('li');
  li.classList.add('quote-card');
  li.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `;
  return li;
};

const parseQuotes = (quotes) => {
  quotes.forEach(quote => quotesListEl.appendChild(quoteListEl(quote)));
};

const init = () => {
  console.log('¯\\_(ツ)_/¯ init...');
  fetchQuotes()
    .then(parseQuotes)
    .catch(console.err);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
