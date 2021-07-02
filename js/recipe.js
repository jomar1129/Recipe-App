class Recipe {
  constructor(currentId = 0) {
    this.recipes = [];
    this.currentId = currentId;
  }

  newRecipe(name, recipe, time) {
    const recipe = {
      id: this.currentId++,
      recipe: recipe,
      time: time,
    };
    this.recipes.push(recipe);
  }

  getId(taskId) {
    console.log(taskId);
    let getTask;
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      if (recipe.id === taskId) {
        // console.log("test");
        getRecipe = recipe;
      }
    }
    return getRecipe;
  }

  render() {
    const todoRecipe = [];
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      const taskHtml = createTaskHtml(recipe.id, recipe.name, recipe.time);
      todoRecipe.push(taskHtml);
      const recipeHTML = todoRecipe.join("\n");
    }
  }
}
