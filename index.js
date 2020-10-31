import axios from 'axios';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const baseEndpoint = 'https://public.tableau.com/profile/api/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.workbooks');

async function fetchWorkbooks(query) {
  const res = await axios.get(`${proxy}${baseEndpoint}${query}`);
  return res.data.workbooks;
}

async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  console.log(form.query.value);
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const workbooks = await fetchWorkbooks(query);
  console.log(workbooks);
  form.submit.disabled = false;
  displayRecipes(workbooks);
}

function displayRecipes(workbooks) {
  console.log('Creating HTML');
  console.log(workbooks);
  const html = workbooks.map((workbook) => {
    let thumbnailParam = workbook.defaultViewRepoUrl.replace('sheets/', '');
    let thumbnailURL = `https://public.tableau.com/thumb/views/${thumbnailParam}`;

    let workbookHTML = `
    <div>
      <h2>${workbook.defaultViewName}</h2>
      <p>${workbook.description}</p>
      <img src=${thumbnailURL} alt=${workbook.defaultViewName}/>
    </div>`

    return workbookHTML;
  });
      // ${workbook.thumbnail &&
      // <a href="${workbook.href}">View Recipe →</a>
  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);
// on page load run it with pizza
fetchAndDisplay('will7508');
