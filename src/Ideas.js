import { useState } from 'react';

export const ideasArr = [
  'write a poem about a dog on a skateboard',
  'write lyrics to my new hit single "therapist in the club"',
  'write text for a birthday card',
];

export default function Ideas(props) {
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);

  const setSamplePrompt = (event) => {
    event.preventDefault();
    props.updateInputText(event);

    if (currentPromptIdx === 2) {
      setCurrentPromptIdx(0);
    } else {
      setCurrentPromptIdx(currentPromptIdx + 1);
    }
  };

  return (
    <div>
      <button onClick={setSamplePrompt} value={ideasArr[currentPromptIdx]} className='button' id='button-reversed'>
        Help me think of something
      </button>
    </div>
  );
}
