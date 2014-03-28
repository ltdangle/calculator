//setup our model
var dishesModel = {
}

dishesModel.dishes = ko.computed(function () {

    //filter by dish title
    var filter_by_title = mainFilter.filterByTitle();

    if (filter_by_title.length > 0) {

        var title_result = [];

        _.each(my.DISHES, function (item) {
            if (item.title.indexOf(filter_by_title) > -1) {
                title_result.push(item);
            }
        });
    } else {
        title_result = my.DISHES;
    }

    //filter by protein
    var filter_by_protein = $.isNumeric(mainFilter.filterByProtein()) ? parseInt(mainFilter.filterByProtein()) : 0;

    if (filter_by_protein > 0) {
        var protein_result = [];
        _.each(title_result, function (item) {
            if (item.stats.protein <= filter_by_protein) {
                protein_result.push(item);
            }
        });
    } else {
        protein_result = title_result;
    }

    //filter by fat
    var filter_by_fat = $.isNumeric(mainFilter.filterByFat()) ? parseInt(mainFilter.filterByFat()) : 0;

    if (filter_by_fat > 0) {
        var fat_result = [];
        _.each(protein_result, function (item) {
            if (item.stats.fat <= filter_by_fat) {
                fat_result.push(item);
            }
        });
    } else {
        fat_result = protein_result;
    }

    //filter by carbs
    var filter_by_carbs = $.isNumeric(mainFilter.filterByCarbs()) ? parseInt(mainFilter.filterByCarbs()) : 0;

    if (filter_by_carbs > 0) {
        var carbs_result = [];
        _.each(protein_result, function (item) {
            if (item.stats.carbs <= filter_by_carbs) {
                carbs_result.push(item);
            }
        });
    } else {
        carbs_result = fat_result;
    }

    //filter by calories
    var filter_by_calories = $.isNumeric(mainFilter.filterByCalories()) ? parseInt(mainFilter.filterByCalories()) : 0;

    if (filter_by_calories > 0) {
        var calories_result = [];
        _.each(carbs_result, function (item) {
            if (item.stats.calories <= filter_by_calories) {
                calories_result.push(item);
            }
        });
    } else {
        calories_result = carbs_result;
    }

    //filter by type
    var filter_by_type = mainFilter.filterByType();
    if (filter_by_type != 'Все') {
        var type_result = [];
        _.each(calories_result, function (item) {

            if (item.type.indexOf(filter_by_type) > -1) {
                type_result.push(item);
            }

        });
    } else {
        type_result = calories_result;
    }

    //filter by ingredient
      var ingredients_result=[];
    _.each(type_result, function (item) {
        var is_valid=true;
        console.log(item.title);
        for (var i=0; i<item.ingredients.length;i++){
            var ingredient = item.ingredients[i];

            if (_.indexOf(productsFilter.selectedItems(), ingredient) == -1){
                console.log(ingredient + 'is not allowed');
                is_valid=false;
                continue;
            }
        }

        if (is_valid){
            ingredients_result.push(item);
        }
    });

    return ingredients_result;
});

//event bindings - add dishes to meals
dishesModel.addToBreakfast = function (item) {

    for (var key in item.stats) {
        var new_stat = mealsModel.breakfast.limits.current[key]() + item.stats[key];
        if (new_stat > mealsModel.breakfast.limits.target[key]()) {
            error_message('Невозможно добавить <strong>' + item.title + '</strong>. Превышена норма ' + key + ' в ' + mealsModel.breakfast.limits.target[key]() + ' единиц.');
            return;
        }
    }

    for (var key in item.stats) {
        var new_stat = mealsModel.breakfast.limits.current[key]() + item.stats[key];
        mealsModel.breakfast.limits.current[key](new_stat);
    }

    item.id = meals_id;
    meals_id++;

    mealsModel.breakfast.dishes.push(item);

    console.log('Added item to breakfast');
};

dishesModel.addToLunch = function (item) {

    for (var key in item.stats) {
        var new_stat = mealsModel.lunch.limits.current[key]() + item.stats[key];
        if (new_stat > mealsModel.lunch.limits.target[key]()) {
            error_message('Невозможно добавить <strong>' + item.title + '</strong>. Превышена норма ' + key + ' в ' + mealsModel.lunch.limits.target[key]() + ' единиц.');
            return;
        }
    }

    for (var key in item.stats) {
        var new_stat = mealsModel.lunch.limits.current[key]() + item.stats[key];
        mealsModel.lunch.limits.current[key](new_stat);
    }

    item.id = meals_id;
    meals_id++;

    mealsModel.lunch.dishes.push(item);

    console.log('Added item to lunch');

};

dishesModel.addToDinner = function (item) {

    for (var key in item.stats) {
        var new_stat = mealsModel.dinner.limits.current[key]() + item.stats[key];
        if (new_stat > mealsModel.dinner.limits.target[key]()) {
            error_message('Невозможно добавить <strong>' + item.title + '</strong>. Превышена норма ' + key + ' в ' + mealsModel.dinner.limits.target[key]() + ' единиц.');
            return;
        }
    }

    for (var key in item.stats) {
        var new_stat = mealsModel.dinner.limits.current[key]() + item.stats[key];
        mealsModel.dinner.limits.current[key](new_stat);
    }

    item.id = meals_id;
    meals_id++;

    mealsModel.dinner.dishes.push(item);

    console.log('Added item to dinner');
};


ko.applyBindings(dishesModel, document.getElementById('dishes-list'));