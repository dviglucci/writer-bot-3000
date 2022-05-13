import './App.css';
import { useState } from 'react';
import Ideas from './Ideas';

const App = () => {
  const [inputText, setInputText] = useState('');
  // const [outputText, setOutputText] = useState('');
  const [responseLog, setResponseLog] = useState([]);

  const requestData = {
    prompt: inputText,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const updateInputText = (event) => {
    setInputText(event.target.value);
  };

  async function onSubmit(event) {
    event.preventDefault();
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
    setInputText('');
    setResponseLog([
      {
        key: responseLog.length + 1,
        prompt: inputText,
        response: data.choices[0].text,
      },
      ...responseLog,
    ]);
  }

  return (
    <div className='app-container'>
      <h1>✨ Writer-Bot 3000 ✨</h1>
      <form onSubmit={onSubmit} className='section-container'>
        <label>
          <h2>👋 Hi friend! What should I write?</h2>
          <Ideas updateInputText={updateInputText} />
          <textarea
            type='text'
            value={inputText}
            onChange={updateInputText}
          ></textarea>
        </label>
        <input type='submit' value='Submit' className='button' />
      </form>
      <section className='section-container'>
        {responseLog.length > 0
          ? responseLog.map((element) => {
              return (
                <div key={element.key} className='entry-container'>
                  <h2 className='entry-header'>Prompt</h2>
                  <div>{element.prompt}</div>
                  <h2 className='entry-header'>Response</h2>
                  <div>{element.response}</div>
                </div>
              );
            })
          : null}
      </section>
      <footer>
        <div>
          Made with love by{' '}
          <a href='https://www.linkedin.com/in/diana-viglucci/'>
            Diana Viglucci
          </a>{' '}
          🖤
        </div>
      </footer>
    </div>
  );
};

export default App;
