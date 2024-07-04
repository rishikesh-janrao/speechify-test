import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, play, pause, playbackState, currentWordRange } =
    useSpeech(sentences);
  function loadNewContent() {
    fetchContent().then((text) => {
      setSentences(parseContentIntoSentences(text));
    });
  }
  useEffect(loadNewContent, []);
  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentWordRange={[currentWordRange[0], currentWordRange[1]]}
          currentSentenceIdx={currentSentenceIdx}
        />
      </div>
      <div>
        <Controls
          loadNewContent={loadNewContent}
          play={play}
          pause={pause}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
