import './App.css';
import { useState } from 'react';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const requestData = {
    prompt: inputText,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const updateInputText = (event) => {
    console.log('updating input to >>>', event.target.value)
    setInputText(event.target.value)
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log('about to fetch...')
    console.log('fucking key >>', process.env.REACT_APP_OPENAI_API_KEY)
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
    console.log('data >>>', data)
    console.log('data.result ...', data.choices[0].text)
    setOutputText(data.choices[0].text);
    setInputText('');
  }

  return (
    <div>
      <header>Fun with AI</header>
      <form onSubmit={onSubmit}>
        <label>
          Enter prompt
          <input type='text' value={inputText} onChange={updateInputText}></input>
        </label>
        <input type='submit' value='Submit' />
      </form>
      <section>
        Result: {outputText}
      </section>
    </div>
  );
};

export default App;
