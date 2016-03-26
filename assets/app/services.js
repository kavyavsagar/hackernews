'use strict';
/**
* Demonstrate how to register services
*
* Services that persists and retrieves values from API
*
*
* @category Hacker News
* @package Angular Services
* @subpackage itemService
* @version  $Id:$v.1.0
* @date 06-06-2016
* @author kavyavidyasagar15@gmail.com
*/

var modulefactory = angular.module('newsApp');

modulefactory.factory('itemService', function ($http, $location, $rootScope) {  
    return {      
      
        getNewStories: function(limit, callback){   
          $http.get('https://hacker-news.firebaseio.com/v0/newstories.json?orderBy="$key"&limitToLast='+limit+'&print=pretty')
               .then(function (response) {

                  if(response.data){
                    var newstories = [], i=0;   

                    angular.forEach(response.data, function(value, key) { 
                      $http.get('https://hacker-news.firebaseio.com/v0/item/'+value+'.json?print=pretty')
                          .then(function (resp) {     
                            if(resp.data){ 
                              newstories.push(resp.data);                             
                              if(i == limit){//last story
                                callback(newstories);
                              }
                            }
                      });
                      i++;        
                    });                    
                  }
          });
        },
        getAskStories: function(limit, callback){   
          $http.get('https://hacker-news.firebaseio.com/v0/askstories.json?orderBy="$key"&limitToLast='+limit+'&print=pretty')
               .then(function (response) {

                  if(response.data){
                    var askstories = [], i=0;   

                    angular.forEach(response.data, function(value, key) { 
                      $http.get('https://hacker-news.firebaseio.com/v0/item/'+value+'.json?print=pretty')
                          .then(function (resp) {     
                            if(resp.data){ 
                              askstories.push(resp.data);                             
                              if(i == limit){//last story
                                callback(askstories);
                              }
                            }
                      });
                      i++;        
                    });                    
                  }
          });
        },
        getShowStories: function(limit, callback){   
          $http.get('https://hacker-news.firebaseio.com/v0/showstories.json?orderBy="$key"&limitToLast='+limit+'&print=pretty')
               .then(function (response) {

                  if(response.data){
                    var showstories = [], i=0;   

                    angular.forEach(response.data, function(value, key) { 
                      $http.get('https://hacker-news.firebaseio.com/v0/item/'+value+'.json?print=pretty')
                          .then(function (resp) {     
                            if(resp.data){ 
                              showstories.push(resp.data);                             
                              if(i == limit){//last story
                                callback(showstories);
                              }
                            }
                      });
                      i++;        
                    });                    
                  }
          });
        },
        getJobStories: function(limit, callback){   
          $http.get('https://hacker-news.firebaseio.com/v0/jobstories.json?orderBy="$key"&limitToLast='+limit+'&print=pretty')
               .then(function (response) {

                  if(response.data){
                    var jobstories = [], i=0;   
                    angular.forEach(response.data, function(value, key) { 
                      if(value){
                        $http.get('https://hacker-news.firebaseio.com/v0/item/'+value+'.json?print=pretty')
                            .then(function (resp) {     
                              if(resp.data){  
                                jobstories.push(resp.data);                             
                                if(i == limit){//last story                                 
                                  callback(jobstories);
                                }
                              }
                        });
                        i++;   
                      }     
                    });                    
                  }
          });
        },
        getComments: function(limit, callback){   
          $http.get('https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&limitToFirst='+limit+'&print=pretty')
               .then(function (response) {

                  if(response.data){
                    var comments = [], i=0;   

                    angular.forEach(response.data, function(value, key) { 
                      $http.get('https://hacker-news.firebaseio.com/v0/item/'+value+'.json?print=pretty')
                          .then(function (resp) {     
                            if(resp.data){
                              var parent = '';
                              angular.forEach(resp.data, function(value1, key1) { 
                                
                                if(key1 == 'title'){
                                  parent = value1;
                                }
                                if(key1 == 'kids' &&  value1){
                                  $http.get('https://hacker-news.firebaseio.com/v0/item/'+value1[0]+'.json?print=pretty')
                                    .then(function (res) {     
                                      if(res.data){
                                        res.data.parent_title = parent;
                                        comments.push(res.data); 
                                                              
                                        if(i == limit){//last story
                                          callback(comments);
                                        }
                                      }
                                    });
                                }
                                
                              });

                            }
                      });
                      i++;        
                    });                    
                  }
          });
        },

    }
});