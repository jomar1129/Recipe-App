const recipeManager = new RecipeManager(0);
let myModal = new bootstrap.Modal(document.getElementById("myModal"));
form = document.querySelector("#taskForm");

recipeManager.loadStorage();
// to render current data into html
recipeManager.render();

form.addEventListener("submit", submitItem);

function submitItem(event) {
  let name = document.querySelector("#inputRecipeName");
  let ingridients = document.querySelector("#inputIngridients");
  let prep = document.querySelector("#inputPrepTime");
  let description = document.querySelector("#inputDescription");
  let course = document.querySelector("#courseType");

  let status = document.querySelector("#inputStatus");
  let alert = document.querySelector("#alert");

  // console.log(myModal);
  let fail = 0;

  event.preventDefault();
  event.stopPropagation();

  if (name.value.trim().length > 5) {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
  } else {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
    fail++;
  }

  if (description.value.trim().length > 5) {
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
  } else {
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
    fail++;
  }

  if (ingridients.value.trim().length > 5) {
    ingridients.classList.add("is-valid");
    ingridients.classList.remove("is-invalid");
  } else {
    ingridients.classList.add("is-invalid");
    ingridients.classList.remove("is-valid");
    fail++;
  }

  if (Number(prep.value)) {
    prep.classList.add("is-valid");
    prep.classList.remove("is-invalid");
  } else {
    prep.classList.add("is-invalid");
    prep.classList.remove("is-valid");
    fail++;
  }

  const clearAll = () => {
    name.classList.remove("is-valid");
    description.classList.remove("is-valid");
    prep.classList.remove("is-valid");
    ingridients.classList.remove("is-valid");

    form.reset();
  };

  if (fail > 0) {
    return;
  } else {
    recipeManager.newRecipe(
      name.value,
      description.value,
      course.value,
      ingridients.value,
      prep.value
    );
  }

  myModal.hide();

  clearAll();
  // console.log(myModal);

  //save locally
  // console.log(myModal);
  // myModal.fade;
  // console.log(myModal);

  recipeManager.saveStorage();
  recipeManager.render();
  //   }
}

/// PREVIEW OF RECIPE

const clickRecipe = document.getElementById("addRecipe");
clickRecipe.addEventListener("click", openCard);

function openCard(event) {
  document
    .querySelector("#addRecipe")
    .addEventListener("click", function (event) {
      console.log("I WAS CLICKED");
      if (event.target.classList.contains("btn-delete")) {
        // if (confirm("Are you sure you want to delete this task?")) {
        const parentTask = event.target.parentElement.parentElement;
        console.log(parentTask);
        const recipeId = Number(parentTask.dataset.taskId);
        recipeManager.deleteRecipe(recipeId);
        recipeManager.saveStorage();
        recipeManager.render();
        // }
      }
    });
}

// SEARCH

const searchBar = document.querySelector("#search");
searchBar.addEventListener("keyup", function (event) {
  recipeManager.searchRecipe(event.target.value);
});

//FILTER
const filter = document.querySelector("#filterCourse");

function onFilter() {
  recipeManager.filterRecipe(filter.value);
}
