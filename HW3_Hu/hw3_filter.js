angular.module("filterApp", [])
    .controller('FilterController', function($scope) {})
    .filter("tokenize", function() {
        return function(inputText, delimiter) {
            if (angular.isString(inputText)) {

                result = "";

                for (i = 0; i < inputText.length - 1; i++) {
                    result += inputText[i];
                    result += delimiter == undefined ? "," : delimiter;
                }

                result += inputText[inputText.length - 1]; 

                return result;
            }
        }
    });
