const createTaskHtml = (id, name, description, course, recipe, time) => {
  console.log(recipe);
  const sentence = recipe.split("\n");
  let newHtml = "";
  newHtml = ` <li>   <div
      class="recipeCard card mx-3 my-3"
      style="width: 18rem"
      data-task-id="${id}"
    >
      <img src="src/image.png" class="card-img-top" alt="recipe-book" />
      <div class="card-body bg-orange text-center">
        <h1
          class="headerTitle card-title text-center"
          data-bs-toggle="collapse"
          href="#collapse${id}"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          ${name.toUpperCase()}
        </h1>
      </div>
      <div div class="previewCard card-body collapse" id="collapse${id}">
        <h5 class="card-text fw-bold">
          <i class="far fa-sticky-note"></i> Description
        </h5>
        <p class="card-text fw-500">${description}</p>
        <h5 class="card-text fw-bold">
          <i class="fas fa-utensils"></i> Course
        </h5>
        <p class="card-text fw-500">${course.toUpperCase()}</p>
        <p></p>
        <h5 class="card-text fw-bold">
          <i class="fas fa-blender"></i> Ingridients
        </h5>
        <p class="card-text fw-500">${sentence}</p>
        <p></p>
        <h5 class="card-text fw-bold">
          <i class="far fa-clock"></i> Preparation Time
        </h5>
        <p class="card-text fw-500">${time} minutes</p>
        <i class="mt-2 mx-2 fas fa-trash btn-delete">Delete</i>
      </div>
    </div>
    </li>`;

  return newHtml;
};

class RecipeManager {
  constructor(currentId = 0) {
    this.recipes = [];
    this.currentId = currentId;
  }

  newRecipe(name, description, course, recipe, time) {
    const newRecipe = {
      id: this.currentId++,
      name: name,
      description: description,
      course: course,
      recipe: recipe,
      time: time,
    };
    this.recipes.push(newRecipe);
  }

  getId(taskId) {
    console.log(`nakuha ko ${taskId}`);
    let getRecipe;
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
      const taskHtml = createTaskHtml(
        recipe.id,
        recipe.name,
        recipe.description,
        recipe.course,
        recipe.recipe,
        recipe.time
      );
      todoRecipe.push(taskHtml);
    }
    const recipeHTML = todoRecipe.join("\n");
    document.querySelector("#addRecipe").innerHTML = recipeHTML;
  }

  searchRender(currentRecipe) {
    console.log("rendered2?");
    const todoRecipe = [];
    for (let i = 0; i < currentRecipe.length; i++) {
      const recipe = currentRecipe[i];
      const taskHtml = createTaskHtml(
        recipe.id,
        recipe.name,
        recipe.description,
        recipe.course,
        recipe.recipe,
        recipe.time
      );
      todoRecipe.push(taskHtml);
    }
    const recipeHTML = todoRecipe.join("\n");
    document.querySelector("#addRecipe").innerHTML = recipeHTML;
  }

  saveStorage() {
    const recipeJson = JSON.stringify(this.recipes);
    localStorage.setItem("recipes", recipeJson);
    const currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId);
    console.log("saved");
  }

  loadStorage() {
    let storageOutput = localStorage.getItem("recipes");
    let storrageId = localStorage.getItem("currentId");
    if (storageOutput) {
      const recipeJson = localStorage.getItem("recipes");
      this.recipes = JSON.parse(recipeJson);
    }
    if (storrageId) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = Number(currentId);
    }
  }

  //filter

  filterRecipe(value) {
    if (value != "all") {
      const searchedRecipe = this.recipes;
      const currentSearch = searchedRecipe.filter((recipe) => {
        if (recipe.course.toLowerCase().includes(value.toLowerCase())) {
          return recipe.course.toLowerCase().includes(value.toLowerCase());
        } else {
          console.log("not found");
          // return this.recipes;
        }
      });
      this.searchRender(currentSearch);
    } else {
      this.render();
    }
  }

  //search
  searchRecipe(search) {
    const searchedRecipe = this.recipes;
    const currentSearch = searchedRecipe.filter((recipe) => {
      if (recipe.name.toLowerCase().includes(search.toLowerCase())) {
        return recipe.name.toLowerCase().includes(search.toLowerCase());
      } else {
      }
    });
    this.searchRender(currentSearch);
  }

  // to delete selected recipe

  deleteRecipe(taskId) {
    const updateTask = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      if (recipe.id !== taskId) {
        updateTask.push(recipe);
      }
    }
    this.recipes = updateTask;
  }
}
