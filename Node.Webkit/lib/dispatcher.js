/*
    dispatcher.js
*/
"use strict";
//INCLUDE MODULES
const fs = require("fs");
const constants = require("./constants");

var dispatcher = class {

    static dispatch(request, response) {
        const serverError = (code,content)=> {
            response.writeHead(code, constants.TEXTPLAIN_CONTENT_TYPE);
            response.end(content);
        };

        const renderHtml = (content) => {
            response.writeHead(200, constants.HTML_CONTENT_TYPE);
            response.end(content, "utf-8");
        };

        const parts = request.url.split("/");

        if (request.url === "/") {
            fs.readFile("./views/index.html",
                (error, content) => {
                    if (error) {
                        serverError(500);
                    } else {
                        renderHtml(content);
                    }
                });
        } else {
            var action = parts[1];
            var args = parts[2];

            serverError(500, "Not handled Error");
        }
    }
}

module.exports = dispatcher;