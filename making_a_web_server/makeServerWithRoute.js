/*  the before example so given acan move only to the port that is sepcifed, and now the route will be defined for a 
specific url's as required*/
/* this method somehow saves the part of writing the route.get with different url over and over again*/

	var pages = [
		{ 'route' : '', output : 'Wohoooo!'},
		{ 'route' : 'about' , output : 'its all about node'},
		{ 'route' : 'another page', output : function(){ return "here's\\"+ this.route;}}
	];



	var http =  require('http');
	var path = require('path');

	http.createServer(function(request, response){
		var lookup=path.basename(decodeURI(request.url));
		pages.forEach(function(page){
			if(page.route == lookup){
				response.writeHead(200, { 'Content-Type' : 'text/html' });
				response.end(typeof page.output === 'function'
				? page.output() : page.output);
			}
		});

		if (!response.finished) {
				response.writeHead(404);
				response.end('Page Not Found!');
		}

	}).listen(8080);