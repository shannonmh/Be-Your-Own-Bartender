document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  $(document).ready(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBh8at-MlvXDNVsDXyjSRu6Hl7423HYbe0",
      authDomain: "bartender-4c74e.firebaseapp.com",
      databaseURL: "https://bartender-4c74e.firebaseio.com",
      projectId: "bartender-4c74e",
      storageBucket: "",
      messagingSenderId: "569675945586"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
  $("#drink-search").on("click", function(event) {
      event.preventDefault();
  
      var userDrink = $("#name-search").val().trim();
      var queryDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userDrink;
  
      $.ajax({
          url: queryDrinkURL,
          method: "GET"
      }).then(function(response) {
          var drinkReturn = response.drinks[0].strDrink;
          var drinkInstructions = response.drinks[0].strInstructions;
          var image = $("<img>");
          image.attr("src", response.drinks[0].strDrinkThumb);
          var ingredients = [];
          for (var i = 1; i <= 15; i++) {
              var drinkIngredients = response.drinks[0]["strIngredient" + i];
  
              if(drinkIngredients !== "") {
                  ingredients.push(drinkIngredients);
              }
          }
  
          $("#name-div").append("Drink Name: " + drinkReturn);
  
          $("#picture-div").append(image);
  
          $("#ingredients-div").text("Ingredients: ");
  
          for (var i = 0; i < ingredients.length; i++) {
              $("#ingredients-div").append(ingredients[i] + ", ");
          }
  
          $("#instructions-div").append("Instructions: " + drinkInstructions);
  
          database.ref().push({
              name: drinkReturn,
              photo: image,
              ingredients: ingredients,
              instructions: drinkInstructions
          });
      });
  });
  
  $("#ingredient-search").on("click", function(event) {
      event.preventDefault();
  
      var userIngredient= $("#user-input-two").val().trim();
      var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient;
  
      $.ajax({
          url: queryIngredientURL,
          method: "GET"
      }).then(function(response) {
          var ingredientID = response.drinks[Math.floor(Math.random() * response.drinks.length)].idDrink;
          console.log(ingredientID);
  
          $.ajax({
              url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ingredientID,
              method: "GET"
          }).then(function(response) {
              var ingredientReturn = response.drinks[0].strDrink;
              var ingredientInstructions = response.drinks[0].strInstructions;
              var imageTwo = $("<img>");
              imageTwo.attr("src", response.drinks[0].strDrinkThumb);
  
              var ingredientsTwo = [];
                  for (var i = 1; i <= 15; i++) {
                  var ingredientIngredients = response.drinks[0]["strIngredient" + i];
  
                  if(ingredientIngredients !== "") {
                      ingredientsTwo.push(ingredientIngredients);
                  }
              }
  
          $("#name-div").append("Drink Name: " + ingredientReturn);
  
          $("#picture-div").append(imageTwo);
  
          $("#ingredients-div").text("Ingredients: ");
  
          for (var i = 0; i < ingredientsTwo.length; i++) {
              $("#ingredients-div").append(ingredientsTwo[i] + ", ");
          }
  
          $("#instructions-div").append("Instructions: " + ingredientInstructions);
  
          database.ref().push({
              name: ingredientReturn,
              photo: imageTwo,
              ingredients: ingredientIngredients,
              instructions: ingredientInstructions
          });
  
      });
  });
  
  });
  
  });