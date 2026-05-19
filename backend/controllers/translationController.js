import Groq from "groq-sdk";

const groq =
  new Groq({

    apiKey:
      process.env.GROQ_API_KEY,
  });

export const translateText =
  async (req, res) => {

    try {

      const {
        text,
        language,
      } = req.body;

      const completion =
        await groq.chat.completions.create({

          messages: [

            {
              role: "system",

              content:
                `Translate the following text into ${language}. Only return translated text.`,
            },

            {
              role: "user",

              content: text,
            },
          ],

          model:
             "llama-3.3-70b-versatile",
        });

      const translation =

        completion.choices[0]
          .message.content;

      res.status(200).json({

        translation,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,
      });
    }
  };