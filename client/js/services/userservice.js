var app = angular.module("homeauto");
app.service('userService', function($http) {
    var user = [];
    
    user.login = function (data)
    {
        return $http({
            method: "POST",
            url: `./login`,
            headers: { 'Content-Type': 'application/json'},
            data: JSON.stringify(data)
            // Setting Headers, Function call to get getToken() to send to db
        }).then(function(responses) {
            localStorage.setItem('details', responses.data.details);
            sessionStorage.setItem('details', responses.data.details);
            // get details
            return responses.data.details;
        }).catch(function(response) {
            throw Error(response.data.message); 
        });
    }
    
    user.getStoredDetails = () => {
        if(localStorage.getItem('details'))
        {
            return localStorage.getItem('details');   
        }
        else
        {
            return 0;   
        }
    }
    

    return user;
});