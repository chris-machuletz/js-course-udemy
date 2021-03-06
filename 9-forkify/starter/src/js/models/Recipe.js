import axios from "axios";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const ingredients = this.ingredients.length;
        const periods = Math.ceil(ingredients / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const longUnits = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'cup', 'pounds', 'pound'];
        const shortUnits = ['tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'cup', 'pound', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform ingredients
            let ingredient = el.toLowerCase();
            longUnits.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, shortUnits[i]);
            });

            // 2. Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => shortUnits.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServings(type) {
        // Calculate new servings based on type (inc or dec)
        const newServings = type === 'inc' ? this.servings + 1 : this.servings - 1;

        // Servings must be greater than 0
        if (newServings > 0) {
            // Calculate ingredients
            this.ingredients.forEach(ing => {
                ing.count = ing.count * (newServings / this.servings);
            });

            this.servings = newServings;
        }
    }
}