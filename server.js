const express = require("express");
const bodyParser = require("body-parser");
const pug = require("pug");
const fs = require("fs");
const port = 3000;
const server = express();
const featureJSON = require("./public/features.json");
const destinations = require("./public/destinations.json");
server.use(bodyParser.json());
server.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

server.get("/", (req, res, next) => {
	const template = pug.compileFile("public/templates/title.pug")({destinations: destinations.destinations});
	res.end(template);
});

server.get('/cardBack.webp', (res,req,next)=>{
	if(err) throw err;
	res.send('./public/images/cardBack.webp');
})

server.get("/features", (req, res, next) => {
	const template = pug.compileFile("public/templates/features.pug")({
		featureJSON: featureJSON.features,
        destinations: destinations.destinations
	});
	res.end(template);
});

server.get("/orders", (req, res, next) => {
	const template = pug.compileFile("public/templates/order.pug")({destinations: destinations.destinations});
	res.end(template);
});

server.post("/orderIntake", (req, res, next) => {
	fs.open("./public/output/order.txt", "r", function (err, fd) {
		if (err) {
			fs.writeFile("./public/order.txt", "", function (err) {
				if (err) console.error(err);
				console.log("file created");
			});
		}
		fs.writeFileSync(
			"./public/order.txt",
			JSON.stringify(req.body),
			(error) => {
				console.log(res);
				if (error) throw error;
			}
		);
	});
	res.redirect('/orders');
});

server.listen(port, (error) => {
	if (error) throw error;
	console.log(`server running on ${port}`);
});
