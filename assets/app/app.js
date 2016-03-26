'use strict';
/**
* Start up 
* 
* Create app module and controller  
*
* @category Hacker News
* @package App
* @subpackage app
* @version  $Id:$v.1.0
* @date 06-06-2016
* @author kavyavidyasagar15@gmail.com
*/

var app = angular.module('newsApp', ['ngMaterial', 'ngMdIcons', 'ngSanitize']);

app.controller('AppCtrl', function($scope, $mdBottomSheet, $mdDialog, itemService){
    // Add title for each tab cntents
    $scope.tabSelect = function(tabSel) {
      switch(tabSel){
        case 1:
            $scope.tabTitle = "Latest News";
            break;
        case 2:
            $scope.tabTitle = "Comments";
            break;
        case 3:
            $scope.tabTitle = "Show News";
            break;
        case 4:
            $scope.tabTitle = "Ask News";
            break;
        case 5:
            $scope.tabTitle = "Job News";
            break;
        default:
            $scope.tabTitle = "Latest News";
            break;
      }
    };
    
  /********** Latest News ********/
  //initial for new stories
  $scope.newstories = []; $scope.limit = 10;$scope.loading = true;
  itemService.getNewStories($scope.limit, function(result){
    if(result){
      $scope.newstories =result;     
      $scope.loading = false;
    }    
  });
  //pagination for new stories
  
  $scope.next_NewPage = 1; $scope.hide_NewPage = false;

  $scope.nextNewStories =  function(){
    $scope.loading = true;
    $scope.newstories = [];
    $scope.next_NewPage += $scope.next_NewPage;
    $scope.limit = $scope.limit + $scope.next_NewPage;

    if($scope.limit <= 100){
      itemService.getNewStories($scope.limit, function(result){
        if(result){
          $scope.newstories = result;     
        }else{
          $scope.hide_NewPage = true;
        }
        $scope.loading = false;
      });
    }else{
      $scope.hide_NewPage = true;
      $scope.loading = false;
    }    
  };

  /********** Ask Stories **********/
  //initial for ask stories
  $scope.askstories = []; $scope.alimit = 10; $scope.aloading = true;
  itemService.getAskStories($scope.alimit, function(result){
    if(result){
      $scope.askstories =result;
       $scope.aloading = false;     
    }    
  });
  //pagination for ask stories
  $scope.next_askPage = 1; $scope.hide_askPage = false;
 
  $scope.nextAskStories =  function(){
    $scope.aloading = true;
    $scope.askstories = [];
    $scope.next_askPage += $scope.next_askPage;
    $scope.alimit = $scope.alimit + $scope.next_askPage;

    if($scope.alimit <= 100){
      itemService.getAskStories($scope.alimit, function(result){
        if(result){
          $scope.askstories = result;   
        }else{
          $scope.hide_askPage = true;
        }   
        $scope.aloading = false;
      });
    }else{
      $scope.hide_askPage = true;
      $scope.aloading = false;
    }    
  };

  /********** Show Stories **********/
  //initial for show stories
  $scope.showstories = []; $scope.slimit = 10;$scope.sloading = true;
  itemService.getShowStories($scope.slimit, function(result){
    if(result){
      $scope.showstories =result; 
      $scope.sloading = false;    
    }    
  });
  //pagination for show stories
  $scope.next_showPage = 1; $scope.hide_showPage = false;
  $scope.nextShowStories =  function(){
    $scope.sloading = true; 
    $scope.showstories = [];
    $scope.next_showPage += $scope.next_showPage;
    $scope.slimit = $scope.slimit + $scope.next_showPage;

    if($scope.slimit <= 100){
      itemService.getShowStories($scope.slimit, function(result){
        if(result){
          $scope.showstories = result;   
        }else{
          $scope.hide_showPage = true;
        } 
        $scope.sloading = false;   
      });
    }else{
      $scope.hide_showPage = true;
      $scope.sloading = false; 
    }    
  };

  /********** Job Stories **********/
  //initial for job stories
  $scope.jobstories = []; $scope.jlimit = 10;$scope.jloading = true; 
  itemService.getJobStories($scope.jlimit, function(result){  
    if(result){

      $scope.jobstories =result;   
      $scope.jloading = false;   
    }    
  });
  //pagination for job stories
  $scope.next_jobPage = 1; $scope.hide_jobPage = false;
  $scope.nextJobStories =  function(){
    $scope.jloading = true;
    $scope.jobstories = [];
    $scope.next_jobPage += $scope.next_jobPage;
    $scope.jlimit = $scope.jlimit + $scope.next_jobPage;

    if($scope.jlimit <= 100){
      itemService.getJobStories($scope.jlimit, function(result){
        if(result){
          $scope.jobstories = result;   
        }else{
          $scope.hide_jobPage = true;
        }   
        $scope.jloading = false;
      });
    }else{
      $scope.hide_jobPage = true;
      $scope.jloading = false;
    }    
  };

  /********** Comments of Stories **********/
  //initial for Comments
  $scope.comments = []; $scope.climit = 10;$scope.cloading = true;
  itemService.getComments($scope.climit, function(result){
    if(result){
      $scope.comments =result; 
      $scope.cloading = false;    
    }    
  });
  //pagination for Comments
  $scope.next_comPage = 1; $scope.hide_comPage = false;
  $scope.nextComments =  function(){
    $scope.cloading = true;  
    $scope.comments = [];
    $scope.next_comPage += $scope.next_comPage;
    $scope.climit = $scope.climit + $scope.next_comPage;

    if($scope.climit <= 100){
      itemService.getComments($scope.climit, function(result){
        if(result){
          $scope.comments = result;   
        }else{
          $scope.hide_comPage = true;
        }   
        $scope.cloading = false;  
      });
    }else{
      $scope.hide_comPage = true;
      $scope.cloading = false;  
    }    
  };

  /* Menu items */

  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"><i class="material-icons">{{item.icon}}</i> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index,$event)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
});
/* Controller for Menu items and its pages*/
app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet, $mdDialog) {
  $scope.items = [
    { name: 'Login', icon: 'lock' },
    { name: 'Signup', icon: 'account_circle' },  
    { name: 'Post to HN', icon: 'question_answer' },
  ];
  
  $scope.listItemClick = function($index, ev) {  	
    var clickedItem = $scope.items[$index];
    switch($index){
    	case 0:
		    $mdDialog.show({
		      controller: DialogController,
		      template: '<md-dialog aria-label="Mango (Fruit)"><md-toolbar md-scroll-shrink="" style="transform: translate3d(0px, 0px, 0px);"><div class="md-toolbar-tools">Login</div></md-toolbar> <md-content class="md-padding"> <form name="userloginForm"> <div layout layout-sm="column"> <md-input-container flex> <label>User Name</label> <input ng-model="user.userName" > </md-input-container> <md-input-container flex> <label>Password</label> <input ng-model="theMax"> </md-input-container> </div> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
		      targetEvent: ev,
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
    		break;
    	case 1:
		    $mdDialog.show({
		      controller: DialogController,
		      template: '<md-dialog aria-label="Mango (Fruit)"><md-toolbar md-scroll-shrink="" style="transform: translate3d(0px, 0px, 0px);"><div class="md-toolbar-tools">Signup</div></md-toolbar> <md-content class="md-padding"> <form name="usersigupForm"> <div layout layout-sm="column"> <md-input-container flex> <label>User Name</label> <input ng-model="user.userName"> </md-input-container> <md-input-container flex> <label>Password</label> <input ng-model="theMax"> </md-input-container> </div> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
		      targetEvent: ev,
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
    		break;
    	case 2:
    		$mdDialog.show({
		      controller: DialogController,
		      template: '<md-dialog aria-label="Mango (Fruit)"><md-toolbar md-scroll-shrink="" style="transform: translate3d(0px, 0px, 0px);"><div class="md-toolbar-tools">Post to HN</div></md-toolbar> <md-content class="md-padding"> <form name="postForm"> <div layout layout-sm="column"> <md-input-container flex> <label>Title</label> <input ng-model="post.title" > </md-input-container> <md-input-container flex> <label>Url</label> <input ng-model="post.url"> </md-input-container> </div> <md-input-container flex> <label>Details</label> <input ng-model="post.details"> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
		      targetEvent: ev,
		    })
		    .then(function(answer) {
		      $scope.alert = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
    		break;
    }
   
    $mdBottomSheet.hide(clickedItem);
  };  

});

/* Actions in Modal box */
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};


/************ App Theme Configuration */
app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('orange', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('yellow');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
