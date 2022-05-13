import './App.css';
import { useState } from 'react';
import Ideas from './Ideas';
import Footer from './Footer';
import makeAPICall from './api/getData';

/**
 * Since there's no id attached to each piece of data, I'm
 * using this key variable in order to have a unique key prop
 * for each child element inside the entry-container div.
 */

let key = 0;

const App = () => {
  const [inputText, setInputText] = useState('');
  const [responseLog, setResponseLog] = useState([]);

  const updateInputText = (event) => {
    setInputText(event.target.value);
  };

  async function onSubmit(event) {
    event.preventDefault();
    const data = await makeAPICall(inputText);
    let split = data.choices[0].text.split('\n');
    setInputText('');
    setResponseLog([
      {
        key: responseLog.length + 1,
        prompt: inputText,
        response: split,
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
                  <div>
                    {element.response.map((line) => {
                      let currentKey = key;
                      key++;
                      if (line === '') {
                        return null;
                      } else return <div key={currentKey}>{line}</div>;
                    })}
                  </div>
                </div>
              );
            })
          : null}
      </section>
      <Footer />
    </div>
  );
};

export default App;
