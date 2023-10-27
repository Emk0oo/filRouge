const Openai = require("openai");
const fs= require('fs');

const openAiObject = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

const iaUrl= "https://clipdrop-api.co/text-to-image/v1";

class Chatopenai {
  static async generateDescriptionForUniverse(univers) {
    const response = await openAiObject.completions.create({
      model: "text-ada-001", // "gpt-3.5-turbo-instruct", // "text-davinci-003"
      prompt: "Donne moi une description de l'univers fictif de " + univers.nom+" en moins de 1010 charactères.",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",response);
  var description = response.choices[0].text;
  return response.choices[0].text;
}

  static async generatePicture(description){
    
  }
}

module.exports = Chatopenai;

