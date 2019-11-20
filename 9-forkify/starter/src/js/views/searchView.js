import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length < limit) {
            newTitle.push(cur);
        }
        return acc + cur.length;
    }, 0);

    return `${newTitle.join(' ')}...`;
}

const renderResult = (recipe) => {
    const singleRecipe = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', singleRecipe);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    // Render results of current page
    const begin = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(begin, end).forEach(renderResult);

    // Render pagination buttons
    renderPagination(recipes, page, resPerPage)
}

const renderButton = (page, type) => `<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`;

export const renderPagination = (results, page, resPerPage) => {
    const pages = Math.ceil(results.length / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Render only next button
        button = renderButton(page, 'next');
    } else if (page > 1 && page < pages) {
        // Render both buttons
        button = `
            ${renderButton(page, 'prev')}
            ${renderButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Render only prev button
        button = renderButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('beforeend', button);
}