'use strict';
/**
* Demonstrate how to use app filters 
*
* @category Hacker News
* @package Angular Filters
* @subpackage filters
* @version  $Id:$v.1.0
* @date 06-06-2016
* @author  kavyavidyasagar15@gmail.com
*/

app.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });

app.filter( 'domain', function () {
  return function ( input ) {
    var output = "",
        matches;

    matches = input.replace(/.*?:\/\//g, ""); // replace http
    matches = matches.split("/");
    output = matches[0];

    return output;
  };
});