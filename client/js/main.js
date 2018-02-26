var app = angular.module("homeauto", ["ngRoute", 'ui.materialize']);
app.config(function($routeProvider) { // Making the Router Provider
    $routeProvider
        .when("/home", { // Url Login
            templateUrl: "/pages/home.html", // Template Url  
            controller: "homeController" // Linked Controller
        })
        .when("/login", { // Url Login
            templateUrl: "/pages/login.html", // Template Url  
            controller: "loginController" // Linked Controller
        });
        
});

app.controller('loginController', function ($scope, $location, $routeParams, userService) {
    
});

app.controller('homeController', function($scope, $location, $routeParams, putService) {
    
    angular.element(document).ready(function() { //what is this?
        $('#demo-component').colorpicker({
            component: '.btn'
        });
    });
    $scope.getstatus = function() {
        putService.getdetails()
            .then(function(details) {
                $scope.details = details;
                $scope.mainstatus = details[0].Status == 1 ? "Turned on" : "Turned off";
                $scope.mainactionstr = details[0].Status == 1 ? "off" : "on";
                console.log(details);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            })
    }
    $scope.getstatus();
    $scope.switchone = function(status) {
        var data = {
            status: status
        }
        putService.switch1(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.switchtwo = function(status) {
        var data = {
            status: status
        }
        putService.switch2(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.switchthree = function(status) {
        var data = {
            status: status
        }
        putService.switch3(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.switchfour = function(status) {
        var data = {
            status: status
        }
        putService.switch4(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.switchonmotor = function(status) {
        var data = {
            status: status
        }
        putService.switchmotor(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.mainswitch = function(status) {
        var data = {
            status: status
        }
        putService.switchmain(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }

    $scope.sendexploit = function() {
        putService.sendExploit()
            .then(function(response) {
                Materialize.toast('<p class = "green-text">' + response + '</p>', 2000);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
});



app.controller('baseController', function($scope) {

});
