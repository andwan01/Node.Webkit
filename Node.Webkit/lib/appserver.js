/*
    server.js
    http://www.jblotus.com/2011/05/30/building-your-first-node-js-app-part-2-building-the-web-server-and-request-dispatcher/
    http://www.jblotus.com/2011/06/09/building-your-first-node-js-app-part-3-view-controller-pattern-w-mustache/
*/
"use strict";
//INCLUDE MODULES
const url = require("url");
const dispatcher = require("./dispatcher");
const constants = require("./constants");

var QueryClass = class {
    static getQueryItems(urlQuery) {
        return url.parse(urlQuery, true).query();
    }
}

var AppServer = class {
    constructor() {
        this.http = require("http");
        this.init = false;
        this.port = process.env.PORT || 1337;        
    }
  
    begin() {
        if (this.init) {
            throw "Already initialised";
        }
        this.http.createServer((request, response) => {
            try {
                response.writeHead(200, constants.TEXTPLAIN_CONTENT_TYPE);
                //console debug on each incoming request
                console.log(`Incoming request from ${request.connection.remoteAddress}`
                    + ` for href: ${url.parse(request.url).href}`);

                request.on("error", (requestError) => {
                    console.error(requestError);
                    response.statusCode = 400;
                    response.end();
                });

                response.on("error",(responseError) => {
                    console.error(responseError);
                    response.end();
                });

                //dispatch request 
                dispatcher.dispatch(request, response);   
                

            } catch (err) {
                console.error(err);
                response.end(err);
            } finally {
                console.log("Request ended");
            }

        }).listen(this.port,"127.0.0.1",() => {
            console.log(`Initialised at ${Date()}`);
            console.log(`Listening on port ${this.port}...`);
            this.init = true;
        });
    }
}
module.exports = Object.freeze(AppServer);