var app = angular.module("homeauto", ["ngRoute", 'ui.materialize']);
app.config(function($routeProvider) { // Making the Router Provider
    $routeProvider
        .when("/", { // Url Login
            templateUrl: "/pages/home.html", // Template Url  
            controller: "homeController" // Linked Controller
        })
        .when("/login", { // Url Login
            templateUrl: "/pages/login.html", // Template Url  
            controller: "loginController" // Linked Controller
        });
});

app.controller('loginController', function($scope, $location, $routeParams, userService) {
    $scope.login = function() {
        var data = {
            name: $scope.name
        }
        userService.login(data).then(function(details) {
                if (details) {
                    $location.path("/");
                }
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
});

app.controller('homeController', function($scope, $location, $routeParams, putService, userService) {
    $scope.getstatus = function() {
        putService.getdetails()
            .then(function(details) {
                $scope.details = details;
                if (details[0].Status == 1) {
                    $scope.mainstatus = "Turned on";
                    $scope.mainactionstr = "off";
                }
                else if (details[0].Status == 0) {
                    $scope.mainstatus = "Turned off";
                    $scope.mainactionstr = "on";
                }
                if (details[1].Status == 1) {
                    $scope.switchonestatus = "Turned on";
                    $scope.s1actionstr = "off";
                }
                else if (details[1].Status == 0) {
                    $scope.switchonestatus = "Turned off";
                    $scope.s1actionstr = "on";
                }
                if (details[2].Status == 1) {
                    $scope.switchtwostatus = "Turned on";
                    $scope.s2actionstr = "off";
                }
                else if (details[2].Status == 0) {
                    $scope.switchtwostatus = "Turned off";
                    $scope.s2actionstr = "on";
                }
                if (details[3].Status == 1) {
                    $scope.switchthreestatus = "Turned on";
                    $scope.s3actionstr = "off";
                }
                else if (details[3].Status == 0) {
                    $scope.switchthreestatus = "Turned off";
                    $scope.s3actionstr = "on";
                }
                if (details[4].Status == 1) {
                    $scope.switchfourstatus = "Turned on";
                    $scope.s4actionstr = "off";
                }
                else if (details[4].Status == 0) {
                    $scope.switchfourstatus = "Turned off";
                    $scope.s4actionstr = "on";
                }
                if (details[5].Status == 1) {
                    $scope.motorstatus = "Turned on";
                    $scope.motoractionstr = "off";
                }
                else if (details[5].Status == 0) {
                    $scope.motorstatus = "Turned off";
                    $scope.motoractionstr = "on";
                }
                console.log(details);
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            })
    }
    if (userService.getStoredDetails() == 0) {
        $location.path("/login");
    }
    else {
        $scope.userdetails = userService.getStoredDetails();
        $scope.getstatus();
    }
    $scope.switch = function(switchid, newstatus) {
        var sendstatus;
        sendstatus = newstatus == "off" ? 0 : 1;
        var data = {
            id: switchid,
            status: sendstatus
        }
        console.log(data);
        putService.switch(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
                $scope.getstatus();
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.switchmotor = function(newstatus) {
        var sendstatus;
        sendstatus = newstatus == "off" ? 0 : 1;
        var data = {
            id: 6,
            status: sendstatus
        }
        putService.switch(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
                $scope.getstatus();
            })
            .catch(function(error) {
                Materialize.toast('<p class = "red-text">' + error + '</p>', 2000);
            });
    }
    $scope.mainswitch = function(newstatus) {
        var sendstatus;
        sendstatus = newstatus == "off" ? 0 : 1;
        var data = {
            id: 1,
            status: sendstatus
        }
        putService.switch(data).then(function(message) {
                Materialize.toast('<p class = "green-text">' + message + '</p>', 2000);
                $scope.getstatus();
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
