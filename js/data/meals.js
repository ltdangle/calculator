//setup meals model
var mealsModel = {
    breakfast: {
        limits: {
            target: {
                protein: ko.observable(200).extend({ previousValue: 'previousValue' }),
                fat: ko.observable(90).extend({ previousValue: 'previousValue' }),
                carbs: ko.observable(100).extend({ previousValue: 'previousValue' }),
                calories: ko.observable(1000).extend({ previousValue: 'previousValue' })
            },
            current: {
                protein: ko.observable(0),
                fat: ko.observable(0),
                carbs: ko.observable(0),
                calories: ko.observable(0)
            }
        },
        dishes: ko.observableArray([])
    },
    lunch: {
        limits: {
            target: {
                protein: ko.observable(0).extend({ previousValue: 'previousValue' }),
                fat: ko.observable(0).extend({ previousValue: 'previousValue' }),
                carbs: ko.observable(0).extend({ previousValue: 'previousValue' }),
                calories: ko.observable(0).extend({ previousValue: 'previousValue' })
            },
            current: {
                protein: ko.observable(0),
                fat: ko.observable(0),
                carbs: ko.observable(0),
                calories: ko.observable(0)
            }
        },
        dishes: ko.observableArray([])
    },
    dinner: {
        limits: {
            target: {
                protein: ko.observable(0).extend({ previousValue: 'previousValue' }),
                fat: ko.observable(0).extend({ previousValue: 'previousValue' }),
                carbs: ko.observable(0).extend({ previousValue: 'previousValue' }),
                calories: ko.observable(0).extend({ previousValue: 'previousValue' })
            },
            current: {
                protein: ko.observable(0),
                fat: ko.observable(0),
                carbs: ko.observable(0),
                calories: ko.observable(0)
            }
        },
        dishes: ko.observableArray([])
    },

    day: {
        limits: {
            target: {
                protein: ko.observable(600).extend({ previousValue: 'previousValue' }),
                fat: ko.observable(300).extend({ previousValue: 'previousValue' }),
                carbs: ko.observable(300).extend({ previousValue: 'previousValue' }),
                calories: ko.observable(3000).extend({ previousValue: 'previousValue' })
            },
            current: {
                protein: null,
                fat: null,
                carbs: null,
                calories: null
            }
        },
        dishes: null
    }
}
