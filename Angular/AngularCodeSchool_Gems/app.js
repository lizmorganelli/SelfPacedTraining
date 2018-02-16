(function () {
    var app = angular.module('store', ['store-products']);

    app.controller('StoreController', function () {
        this.products = gems;
    });

    // app.controller('PanelController', function () {
    //     this.tab = 1;

    //     this.selectTab = function (setTab) {
    //         this.tab = setTab;
    //     };

    //     this.isSelected = function (checkTab) {
    //         return this.tab === checkTab;
    //     };
    // });

    app.controller('ReviewController', function () {
        this.review = {};

        this.addReview = function (product) {
            product.reviews.push(this.review);

            this.review = {};
        };
    });

    //moved the following into product.js and defined a new module
    // app.directive('productTitle', function () {
    //     return {
    //         restrict: 'E',
    //         //could use 'A' for attribute
    //         templateUrl: 'product-title.html'
    //     }
    // });

    // app.directive('productPanels', function () {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'product-panels.html',
    //         controller: function () {
    //             this.tab = 1;

    //             this.selectTab = function (setTab) {
    //                 this.tab = setTab;
    //             };

    //             this.isSelected = function (checkTab) {
    //                 return this.tab === checkTab;
    //             };
    //         },
    //         controllerAs: 'panel'
    //     };
    // });

    var gems = [
        {
            name: 'Dodecahedron Gem',
            price: 2.00,
            description: "This is obviously a Dodecahedron.  It's whateves.",
            canPurchase: true,
            images: [
                {
                    full: 'dodecahedron-01-full.jpg',
                    thumb: 'dodecahedron-01-thumb.jpg'
                }
            ],
            reviews: [
                {
                    stars: 5,
                    body: "I love this gem!",
                    author: "joe@thomas.com"
                },
                {
                    stars: 3,
                    body: "This gem is meh",
                    author: "bob@thomas.com"
                },

            ]
        },
        {
            name: 'Pentagonal Gem',
            price: 5.95,
            description: "Probably has 5 sides.  Also probably shiny.",
            canPurchase: false,
            images: [
                {
                    full: 'dodecahedron-01-full.jpg',
                    thumb: 'dodecahedron-01-thumb.jpg'
                }
            ],
            reviews: [
                {
                    stars: 5,
                    body: "I love this gem!",
                    author: "joe@thomas.com"
                },
                {
                    stars: 3,
                    body: "This gem is meh",
                    author: "bob@thomas.com"
                },

            ]
        }
    ];
})();