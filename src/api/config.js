const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const data = {
//   prompt: 'Write a poem about a dog wearing skis',
//   temperature: 0.5,
//   max_tokens: 64,
//   top_p: 1.0,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
// };

//  async function (req, res) {
//     try {
//         const response = await openai.createCompletion('text-curie-001', data);
//         res.status(200).json({ result: response.data.choices[0].text });
//     } catch (err) {
//         console.log('Error fetching data from API: ', err)
//     }
// }




// fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//   },
//   body: JSON.stringify(data),
// });
