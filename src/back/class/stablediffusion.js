const connection = require("../mysql");
const fs = require("fs");
const Image= require("./image");
const iaUrl = "https://clipdrop-api.co/text-to-image/v1";

class StableDiffusion {


  static async generatePicture(prompt) {
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

    return new Promise((resolve, reject) => {
      fetch(iaUrl, requestOptions).then((response) => {
        response.arrayBuffer().then((buffer) => {
          let outputName = Math.random().toString(36) + ".png";
          fs.writeFile(
            "./src/back/output/imagePersonnage/" + outputName, Buffer.from(buffer),() => {
              console.log(
                "Saved output to ./src/back/output/imagePersonnage/" +
                  outputName
              );
            }
          );
          let image = new Image();

          image.url ="./src/back/output/imagePersonnage/" + outputName;

          let sql = "INSERT INTO images (url) VALUES ( ?)";
          const values = [image.url];

          connection.query(sql, values, (err, result) => {
            if (err) {
              console.error("Erreur lors de l'insertion :", err);
              reject(err);
            } else {
              image.id = result.insertId;
              resolve(image.id);
            }
          });
        });
      });
    });
  }


}

module.exports = StableDiffusion;
