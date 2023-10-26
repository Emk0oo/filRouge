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
        // {
        //     "role": "assistant",
        //     "content": "Ah, je ne me plains pas, matelot. Il y a toujours du rhum à boire et de l'aventure à l'horizon ici à Bilgewater."
        // },
        // {
        //     "role": "user",
        //     "content": "Raconte moi le différent que tu as avec Miss Fortune et pourquoi tu lui en veux. Il parait qu'il ne faut pas la mentionner devant toi."
        // },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response;
    // const response = await openai.completions.create({
    //     model: "text-ada-001", // "gpt-3.5-turbo-instruct", // "text-davinci-003"
    //     prompt: "Donne moi une description de l'univers fictif de " + univers.nom,
    //     temperature: 1,
    //     max_tokens: 256,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    // });

    // return response;
  }
}

module.exports = Chatopenai;
