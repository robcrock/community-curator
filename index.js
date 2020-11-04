import axios from 'axios';

const proxy = `https://cors-anywhere.herokuapp.com/`;
const baseEndpoint = 'https://public.tableau.com/profile/api/';
const form = document.querySelector('form.search');
const app = document.querySelector('.band');
// htmlHook.innerHTML = `<div class="grid"></div>`
// const app = htmlHook.querySelector('div');

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
  const html = workbooks.map((workbook) => {
    console.log(workbooks);
    let thumbnailParam = workbook.defaultViewRepoUrl.replace('sheets/', '');
    let thumbnailURL = `https://public.tableau.com/thumb/views/${thumbnailParam}`;
    
    // Example https://public.tableau.com/profile/will7508#!/vizhome/ChildMarriage_16014531003290/ChildMarriageInstaviz

    // https://public.tableau.com/views/ChildMarriage_16014531003290/ChildMarriageInstaviz?:language=en&:display_count=y&:origin=viz_share_link
    let dashboardBaseURL = 'https://public.tableau.com/profile/';
    let embedURL = 'https://public.tableau.com/views/';
    let dashboardURLSuffix = workbook.defaultViewName.split(' ').join('');
    dashboardURLSuffix = dashboardURLSuffix.replace("'", '');
    let dashboardURL = `${dashboardBaseURL}${workbook.authorProfileName}#!/vizhome/${workbook.workbookRepoUrl}/${dashboardURLSuffix}`
    let dashboardEmbed = `${embedURL}${workbook.workbookRepoUrl}/${dashboardURLSuffix}`

    // <a href="${dashboardURL}" class="card">
    let workbookHTML = `
    <div class="item" data-dashboard=${dashboardEmbed}>
      <div class="card">
        <div class="thumb" style="background-image: url(${thumbnailURL});"></div>
        <article>
          <h1 class='card__header'>${workbook.defaultViewName}</h1>
          <p class="card__text">${workbook.description}</p>
        </article>
      </div>
    </div>`

    return workbookHTML;
  });

  app.innerHTML = html.join('');  

  const modalOuter = document.querySelector('.modal-outer');
  const modalInner = document.querySelector('.modal-inner');  

  // Add event listeners
  const cardButton = document.querySelectorAll('.item');
  
  function handleCardButtonClick(event) {
    const card = event.currentTarget;
    // grab URL from card button
    const url = card.dataset.dashboard;
    console.log(url);
    // populare the modal
    // modalInner.innerHTML = `
    // <div class="embed-responsive embed-responsive-16by9">
    //   <iframe class="embed-responsive-item"
    //     src="${url}"
    //     allowfullscreen></iframe>
    // </div>
    // `;
    // Show the modal
    modalOuter.classList.add('open');
    
    modalOuter.addEventListener('click', function(event) {
      const isOutside = !event.target.closest('.modal-inner');
      if (isOutside) {
        modalOuter.classList.remove('open');
      }
    })
  }


  cardButton.forEach(button => button.addEventListener('click', handleCardButtonClick));
}


form.addEventListener('submit', handleSubmit);
// on page load run it with pizza
fetchAndDisplay('will7508');
