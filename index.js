import axios from 'axios';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const baseEndpoint = 'https://public.tableau.com/profile/api/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('#app');

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
  form.submit.disabled = false;
  displayRecipes(workbooks);
}

function displayRecipes(workbooks) {
  console.log('Creating HTML');
  console.log(workbooks);
  // Example https://public.tableau.com/profile/will7508#!/vizhome/ChildMarriage_16014531003290/ChildMarriageInstaviz

  const html = workbooks.map((workbook) => {
    let thumbnailParam = workbook.defaultViewRepoUrl.replace('sheets/', '');
    let thumbnailURL = `https://public.tableau.com/thumb/views/${thumbnailParam}`;

    let dashboardBaseURL = 'https://public.tableau.com/profile/';
    let dashboardURLSuffix = workbook.defaultViewName.split(' ').join('');
    dashboardURLSuffix = dashboardURLSuffix.replace("'", '');
    let dashboardURL = `${dashboardBaseURL}${workbook.authorProfileName}#!/vizhome/${workbook.workbookRepoUrl}/${dashboardURLSuffix}`

    let workbookHTML = `
    <li class='repo bg-light'>
      <h4 class='header-lg center-text'>
        ${workbook.defaultViewName}
      </h4>
      <img
        class='avatar'
        src=${thumbnailURL}
        alt=${workbook.defaultViewName}
      />
      <p>${workbook.description}</p>
    </li>`

    return workbookHTML;
  });
  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);
// on page load run it with pizza
fetchAndDisplay('will7508');
