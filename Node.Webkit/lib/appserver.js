"use strict";

var url = require("url");

const contentTextPlain = { "content-type": "text/pain" };
const contentTextHtml = { "content-type": "text/html" };


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
        this.http.createServer((req, res) => {
            try {
                res.writeHead(200, contentTextHtml);

                req.on("error", (err) => {
                    console.error(err);
                    res.statusCode = 400;
                    res.end();
                });

                res.on("error",(err) => {
                    console.error(err);
                });

                if (req.method === "GET" && req.url === "/test") {
                    res.write("WORKING");
                } else {
                    res.writeHead(404, contentTextPlain);
                    res.write("404 not found");
                }


            } catch (err) {
                console.error()(err);
            } finally {
                res.end();
                console.log("Request ended");
            }

        }).listen(this.port);
        this.init = true;
        console.log(`Initialised at ${Date()}`);
        console.log(`Listening on port ${this.port}...`);
    }
}

module.exports = AppServer;