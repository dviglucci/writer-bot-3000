import './App.css';
import { useState } from 'react';

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
    console.log('raw data ...', data.choices[0].text);
    // setOutputText(data.choices[0].text);
    setInputText('');
    setResponseLog([{key: responseLog.length + 1, prompt: inputText, response: data.choices[0].text}, ...responseLog])
    console.log('response log >>', responseLog)
  }

  return (
    <div className='app-container'>
      <header>Fun with AI</header>
      <form onSubmit={onSubmit} className='section-container'>
        <label>
          <section>Enter prompt</section>
          <input
            type='text'
            value={inputText}
            onChange={updateInputText}
          ></input>
        </label>
        <input type='submit' value='Submit' className='button' />
      </form>
      <section>
        {responseLog.length > 0 ?
        responseLog.map((element) => {
          return (
            <div key={element.key}>
              <h3>Prompt:</h3>
              <div>{element.prompt}</div>
              <h3>Response:</h3>
              <div>{element.response}</div>
            </div>
          )
        })
        : null} 
      </section>
    </div>
  );
};

export default App;
