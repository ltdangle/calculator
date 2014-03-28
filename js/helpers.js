//global namespace for the app
var my = {};

//extender to allow accesing previous value, from
//http://stackoverflow.com/questions/15055726/how-to-define-a-custom-binding-who-use-previous-value-to-determine-class-in-knoc
ko.extenders.previousValue = function (target, propertyName) {
    var previousValue = ko.observable(null);

    target[propertyName] = ko.computed(previousValue);

    target.subscribe(function (oldValue) {
        previousValue(oldValue);
    }, target, 'beforeChange');

    return target;
};

//knockout custom bindings
ko.bindingHandlers.mealLimit = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var current_value_obs = valueAccessor();
        var previous_value_obs = valueAccessor().previousValue;
        var bindings = allBindingsAccessor();

        $(element).val(current_value_obs());


        $(element).on('change', function () {
            //update value
            current_value_obs(this.value);

            if (!$.isNumeric(this.value)) {
                current_value_obs(previous_value_obs());
                this.value = current_value_obs();
                return;

            }

            var day_limit = my.mealsModel.day.limits.target[bindings['type']]();

            var meals_total = parseInt(my.mealsModel.breakfast.limits.target[bindings['type']]());
            meals_total += parseInt(my.mealsModel.lunch.limits.target[bindings['type']]());
            meals_total += parseInt(my.mealsModel.dinner.limits.target[bindings['type']]());


            //check if meal setting is bigger than setting for the whole day
            if (meals_total > day_limit) {

                error_message('Максимальное количество показателя ' + bindings['type'] + ' превышает дневную норму в ' + day_limit + ' единиц.');

                current_value_obs(previous_value_obs());
                this.value = current_value_obs();
                $(this).fadeOut().fadeIn(800);

                return;
            }


            //check if meal setting is larger than what has already been selected for the meal
            var current_limit = parseInt(my.mealsModel[bindings['meal']].limits.current[bindings['type']]());

            if (current_limit > 0 && (current_value_obs() < current_limit)) {
                error_message('Невозможно изменить показатель цели. Значение больше текущего ( ' + current_value_obs() + ' < ' + my.mealsModel[bindings['meal']].limits.current[bindings['type']]() + ' )');

                current_value_obs(previous_value_obs());
                this.value = current_value_obs();
                $(this).fadeOut().fadeIn(800);

                return;
            }

        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {

    }
};

ko.bindingHandlers.dayLimit = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var current_value_obs = valueAccessor();
        var previous_value_obs = valueAccessor().previousValue;
        var bindings = allBindingsAccessor();

        $(element).val(current_value_obs());

        $(element).on('change', function () {
            //update value
            current_value_obs(this.value);

            if (!$.isNumeric(this.value)) {
                current_value_obs(previous_value_obs());
                this.value = current_value_obs();
                return;

            }

            //check if setting for the day is larger than what has already been selected for the day
            var current_limit = parseInt(my.mealsModel.day.limits.current[bindings['type']]());

            if (current_limit > 0 && (current_value_obs() < current_limit)) {
                error_message('Невозможно изменить показатель цели. Значение больше текущего ( ' + current_value_obs() + ' < ' + my.mealsModel.day.limits.current[bindings['type']]() + ' )');

                current_value_obs(previous_value_obs());
                this.value = current_value_obs();
                $(this).fadeOut().fadeIn(800);

                return;
            }

        });


    }
}

//error messages
function error_message(msg) {
    $('.modal-content').html(msg);
    $('#myModal').modal();
}
