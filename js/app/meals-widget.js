
var meals_id=0;

//observables for current nutrition stats
mealsModel.day.limits.current.protein=ko.computed(function(){
    return mealsModel.breakfast.limits.current.protein() + mealsModel.lunch.limits.current.protein() + mealsModel.dinner.limits.current.protein();

});

mealsModel.day.limits.current.fat=ko.computed(function(){
    return mealsModel.breakfast.limits.current.fat() + mealsModel.lunch.limits.current.fat() + mealsModel.dinner.limits.current.fat();

});

mealsModel.day.limits.current.carbs=ko.computed(function(){
    return mealsModel.breakfast.limits.current.carbs() + mealsModel.lunch.limits.current.carbs() + mealsModel.dinner.limits.current.carbs();

});

mealsModel.day.limits.current.calories=ko.computed(function(){
    return mealsModel.breakfast.limits.current.calories() + mealsModel.lunch.limits.current.calories() + mealsModel.dinner.limits.current.calories();

});


//computed observable for day dishes
mealsModel.day.dishes=ko.computed(function (){
    var day_dishes=[];
    _.each(mealsModel.breakfast.dishes(), function(element, index){
        day_dishes.push(element);
    });

    _.each(mealsModel.lunch.dishes(), function(element, index){
        day_dishes.push(element);
    });

    _.each(mealsModel.dinner.dishes(), function(element, index){
        day_dishes.push(element);
    });

    return day_dishes;
});



//allow individual dishes deletion
mealsModel.breakfast.deleteDish=function(dish, event){
    event.preventDefault();

    //http://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
    var newArray = _.reject(mealsModel.breakfast.dishes(), function(el) { return el.id === dish.id; });

    mealsModel.breakfast.dishes(newArray);

    //update nutrition stats
    for (var key in mealsModel.breakfast.limits.current){
        var curr_val=mealsModel.breakfast.limits.current[key]();
        var diff=curr_val-dish.stats[key];
        mealsModel.breakfast.limits.current[key](diff);
    }
}

mealsModel.lunch.deleteDish=function(dish, event){
    event.preventDefault();

    //http://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
    var newArray = _.reject(mealsModel.lunch.dishes(), function(el) { return el.id === dish.id; });

    mealsModel.lunch.dishes(newArray);

    //update nutrition stats
    for (var key in mealsModel.lunch.limits.current){
        var curr_val=mealsModel.lunch.limits.current[key]();
        var diff=curr_val-dish.stats[key];
        mealsModel.lunch.limits.current[key](diff);
    }
}

mealsModel.dinner.deleteDish=function(dish, event){
    event.preventDefault();

    //http://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
    var newArray = _.reject(mealsModel.dinner.dishes(), function(el) { return el.id === dish.id; });

    mealsModel.dinner.dishes(newArray);

    //update nutrition stats
    for (var key in mealsModel.dinner.limits.current){
        var curr_val=mealsModel.dinner.limits.current[key]();
        var diff=curr_val-dish.stats[key];
        mealsModel.dinner.limits.current[key](diff);
    }
}



ko.applyBindings(mealsModel, document.getElementById('meals-widget'));