var app = angular.module("homeauto");
app.service('putService', function($http) {
    var test = [];
    
    test.sendExploit = function ()
    {
        return $http({
            method: "PUT",
            url: `./login`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            localStorage.setItem('token', responses.data.token);
            sessionStorage.setItem('token', responses.data.token);
            // get details
            return responses.data.token;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }
    
    test.switch = function (data)
    {
        return $http({
            method: "POST",
            url: `./updateSwitch`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            return responses.data.message;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }

    
    test.switchmotor = function (data)
    {
        return $http({
            method: "POST",
            url: `./switchmotor`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            return responses.data.message;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }
    
    test.pickcolorforbulb = function (data)
    {
        return $http({
            method: "POST",
            url: `./pickcolorbulb`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            return responses.data.message;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }
    
    test.switchmain = function (data)
    {
        return $http({
            method: "POST",
            url: `./switchmain`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            return responses.data.message;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }
    
    
    
    test.getdetails = function ()
    {
        return $http({
            method: "GET",
            url: `./getDetails`,
            headers: { 'Content-Type': 'application/json'},
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            console.log(responses.data.switches);
            localStorage.setItem('statusdetails', responses.data.switches);
            sessionStorage.setItem('statusdetails', responses.data.switches);
            // get details
            return responses.data.switches;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }

    return test;
});