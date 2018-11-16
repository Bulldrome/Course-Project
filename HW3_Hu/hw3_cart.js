var mApp = angular.module('shoppingCartApp', []);

mApp.controller('ShoppingCartController', function ShoppingCartController($scope) {

    if (localStorage.Qian_cart) {
        $scope.books = JSON.parse(localStorage.getItem('Qian_cart'));
    } else {

        $scope.books = [{
            title: 'Absolute Java',
            qty: 1,
            unitprice: 114.95
        }, {
            title: 'Pro HTML5',
            qty: 1,
            unitprice: 27.95
        }, {
            title: 'Head First HTML5',
            qty: 1,
            unitprice: 27.89
        }];

    }

    $scope.getTotalPrice = function() {

        var totalPrice = 0;

        for (var i = 0; i < $scope.books.length; i++) {
            totalPrice += $scope.books[i].unitprice * $scope.books[i].qty;
        }

        totalPrice = totalPrice.toFixed(2);

        $scope.books.totalPrice = totalPrice;

        return totalPrice;
    }

    $scope.books.totalPrice = $scope.getTotalPrice();



    $scope.saveBook = function() {
        localStorage.setItem('Qian_cart', JSON.stringify($scope.books));
        alert("Saved!");
    }

    $scope.addBook = function(index) {
        $scope.books.push({
            title: 'New Book',
            qty: 1,
            unitprice: 10.99
        });
        $scope.getTotalPrice();
    }

    $scope.removeBook = function(index) {
        $scope.books.splice(index, 1);
        $scope.getTotalPrice();
    }

});
