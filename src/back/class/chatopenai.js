const Openai = require("openai");
const fs = require("fs");
const connection = require("../mysql");

const openAiObject = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const iaUrl = "https://clipdrop-api.co/text-to-image/v1";

class Chatopenai {
  static async generateDescriptionForUniverse(univers) {
    const response = await openAiObject.completions.create({
      model: "text-ada-001", // "gpt-3.5-turbo-instruct", // "text-davinci-003"
      prompt:
        "Donne moi une description de l'univers fictif de " +
        univers.nom +
        " en moins de 1010 charactères.",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.choices[0].text;
  }

  static async generateDescriptionForCharacter(personnage) {
    const response = await openAiObject.completions.create({
      model: "text-ada-001", // "gpt-3.5-turbo-instruct", // "text-davinci-003"
      prompt:
        "Donne moi une description du personnage de " +
        personnage.nom +
        " en moins de 1010 charactères.",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.choices[0].text;
  }

  static async generateDescriptionImagePersonnage(personnage) {
    let prompt =
      "Voici mon personnage " +
      personnage.nom +
      " qui a pour description : " +
      personnage.description +
      ". Donne moi un prompt pour générer une image à l'aide d'un IA de type text to image afin de générer un portrait du personnage" +
      personnage.nom +
      ". Le prompt doit être en anglais de moins de 500 charactères.";

      let reponse= await openAiObject.completions.create({
        model: "davinci",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      return reponse.choices[0].text;
  }

  static async generatePicture(univers) {
    let prompt = "Génère une image pour l'univers de " + univers.nom;
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
    fetch(iaUrl, requestOptions).then((response) => {
      response.arrayBuffer().then((buffer) => {
        let outputName = Math.random().toString(36) + ".png";
        fs.writeFile(
          "./src/back/output/imageUnivers/" + outputName,
          Buffer.from(buffer),
          () => {
            console.log("Saved output to ./output/" + outputName);
            console.log(process.env.CLIPDROP_API_KEY);
          }
        );
      });
    });
  }

  // static async generatePictureCharacter(personnage) {
  //   let prompt = "Génère une photo de profil de " + personnage.nom;
  //   let formData = new FormData();
  //   formData.append("prompt", prompt);

  //   let requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "x-api-key": process.env.CLIPDROP_API_KEY,
  //     },
  //     body: formData,
  //     redirect: "follow",
  //   };
  //   fetch(iaUrl, requestOptions).then((response) => {
  //     response.arrayBuffer().then((buffer) => {
  //       let outputName = Math.random().toString(36) + ".png";
  //       fs.writeFile(
  //         "./src/back/output/imagePersonnage/" + outputName,
  //         Buffer.from(buffer),
  //         () => {
  //           console.log(
  //             "Saved output to ./src/back/output/imagePersonnage/" + outputName
  //           );
  //         }
  //       );
  //     });
  //   });

  //   // let sql= "INSERT INTO images (id_personnage, url) VALUES (?, ?)";
  //   // const values = [
  //   //   personnage.id,
  //   //   outputName,
  //   // ];

  //   // connection.query(sql, values, (err, result) => {
  //   //   if (err) {
  //   //     console.error("Erreur lors de l'insertion :", err);
  //   //     res.status(500).json({ error: "Erreur lors de l'insertion" });
  //   //   } else {

  //   //     console.log("Enregistrement inséré avec succès !");
  //   //     // res.status(200).json(personnage.toMap());
  //   //   }
  //   // });
  // }
}

module.exports = Chatopenai;
