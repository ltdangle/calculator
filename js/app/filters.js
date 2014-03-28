my.mainFilter = (function () {
    var mainFilter = {};

    mainFilter.filterByTitle = ko.observable('');
    mainFilter.filterByProtein = ko.observable('');
    mainFilter.filterByFat = ko.observable('');
    mainFilter.filterByCarbs = ko.observable('');
    mainFilter.filterByCalories = ko.observable('');
    mainFilter.filterByType = ko.observable('');

    ko.applyBindings(mainFilter, document.getElementById('main-filter'));

    return mainFilter;

})();


my.productsFilter = (function () {
    var productsFilter = {
        ingredients: ko.observableArray(my.INGREDIENTS)
    };

    productsFilter.selectedItems = ko.observableArray();

    for (var ing in productsFilter.ingredients()) {

        for (var key in productsFilter.ingredients()[ing].items()) {

            productsFilter.selectedItems().push(productsFilter.ingredients()[ing].items()[key]);
        }
    }

    ko.applyBindings(productsFilter, document.getElementById('products-filter'));

    return productsFilter;
})();

