const Openai = require("openai");

class Chatopenai {
  keyopenai = new Openai({
    apiKey: process.env.OPENAI_API_KEY,
  });

  static async generateDescriptionForUniverse(univers) {
    const response = await Openai.chat.completions.create({
      model: "gpt-3.5-turbo", // "gpt-4"
      messages: [
        {
          role: "user",
          content:
            "Donne moi une description de l'univers fictif de " + univers.nom,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response;

  }
}

module.exports = Chatopenai;
