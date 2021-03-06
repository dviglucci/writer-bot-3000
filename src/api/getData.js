export default async function makeAPICall(inputText) {
  const requestData = {
    prompt: inputText,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const response = await fetch(
    'https://api.openai.com/v1/engines/text-curie-001/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestData),
    }
  );
  const data = await response.json();

  return data;
}
