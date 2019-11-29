// You can only search recipes for the terms "pizza", "bacon" and "broccoli"
// res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';

const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    console.log(state);

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            clearLoader();
            alert('Something went wrong searching for recipes...');
        }

    }
}

elements.searchFormSubmit.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    const page = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, page);
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from URL
    const id = parseInt(window.location.hash.replace('#', ''));

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Hightlight selected search item
        if (state.recipe) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
        } catch (error) {
            alert('Error processing recipe');
        }

        // Calculate servings & time
        state.recipe.calcTime();
        state.recipe.calcServings();
        state.recipe.parseIngredients();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    }
}

/**
 * LIST CONTROLLER
 */
const addIngredientsToShoppingList = () => {
    // Create new List if there is none
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach(el => {
        listView.renderItem(el);
    });
}

console.log(state);

/**
 * EVENT LISTENERS
 */

// Add two event listeners
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * Event listeners:
 * - increase and decrease servings buttons
 * - add ingredients to shopping list
 *  */
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.servings-dec, .servings-dec *')) {
        //decrease servings
        state.recipe.updateServings('dec');
    } else if (e.target.matches('.servings-inc, .servings-inc *')) {
        //increase servings
        state.recipe.updateServings('inc');
    } else if (e.target.matches('.ing_to_shopping-list, .ing_to_shopping-list *')) {
        addIngredientsToShoppingList();

    }
    recipeView.updateServingsAndIngredients(state.recipe);
});

window.l = new List();