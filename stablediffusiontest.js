const fs = require("fs");
require("dotenv").config();

let stableDiffusionUrl = "https://clipdrop-api.co/text-to-image/v1";

//let prompt = "A cat in a hat in Pixar style";
let prompt = "Create a heartwarming Pixar-style portrait capturing Ron Weasley's essence from Harry Potter. Illustrate his warmth, courage, and loyalty, showcasing his quirky humor and fierce protectiveness. Craft Ron in Gryffindor robes, surrounded by his iconic exclamations like 'Blimey!' and 'Bloody hell!'. Highlight his endearing clumsiness and unwavering friendship with Harry and Hermione. Let his genuine, caring nature shine through in a scene that captures the magic of camaraderie and bravery.";

let formData = new FormData();
formData.append("prompt", prompt);

let requestOptions = {
    method: "POST",
    headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
    },
    body: formData,
    redirect: "follow",
};

fetch(stableDiffusionUrl, requestOptions).then((response) => {
    response.arrayBuffer().then((buffer) => {
        let outputName = Math.random().toString(36) + ".png";
        fs.writeFile("./src/back/output" + outputName, Buffer.from(buffer), () => {
            console.log("Saved output to ./output/" + outputName);
        });
    });
});