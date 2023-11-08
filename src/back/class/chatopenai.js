const Openai = require("openai");
const fs = require("fs");
const connection = require("../mysql");
const Message = require("./message");

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

    let reponse = await openAiObject.completions.create({
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

  static async generateResponseForMessage(idUser, idPersonnage) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT m.contenu, m.isHumain, p.nom FROM `messages` m INNER JOIN personnages p on m.id_personnage=p.id WHERE m.id_utilisateur=? AND m.id_personnage=? ORDER BY m.`date_dernier_message` ASC;";
      const values = [idUser, idPersonnage];
      console.log(sql, values);

      connection.query(sql, values, async (err, rows, fields) => {
        if (err) {
          console.error("Erreur lors de la récupération des messages :", err);
          res
            .status(500)
            .json({ error: "Erreur lors de la récupération des messages" });
          return;
        }
        let tabMessage = [];

        for (let row of rows) {
          let prefix = null;
          let i = 0;
          if (i == 0) {
            prefix =
              "Dans le cadre d'un jeu rôle tu prends le rôle de " +
              row.nom +
              " dans le but de faire conversation avec l'utilisateur de l'application.";
            i++;
          }
          let monMessage = Message.fromMap(row);
          var format = {
            role: monMessage.isHumain ? "user" : "assistant",
            content: prefix + monMessage._contenu,
          };
          tabMessage.push(format);
        }
        console.log(tabMessage);

        const openai = new Openai({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // "gpt-4"
          messages: tabMessage,
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(response.choices[0].message.content);
        let messageUtilisateur = new Message();
        console.log("là");
        messageUtilisateur.contenu = response.choices[0].message.content;
        messageUtilisateur.isHumain = false;
        messageUtilisateur._id_personnage = idPersonnage;
        messageUtilisateur.id_utilisateur = idUser;
        
        
        
        resolve(messageUtilisateur);

      });//query premiere

    });//promise

  }//function
}

module.exports = Chatopenai;
