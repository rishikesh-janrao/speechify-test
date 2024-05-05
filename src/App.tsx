import { useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {
    currentSentenceIdx,
    play: playText,
    pause,
    playbackState,
  } = useSpeech(sentences);
  const loadNewContent = () => {
    fetchContent().then((text) => {
      setSentences(parseContentIntoSentences(text));
    });
  };
  const play = () => {
    if (playbackState === "initialized") {
      fetchContent().then((text) => {
        setSentences(parseContentIntoSentences(text));
        playText();
      });
    }
  };
  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        {playbackState === "playing" && sentences.length > 0 && (
          <CurrentlyReading
            sentences={sentences}
            currentWordRange={[0, 3]}
            currentSentenceIdx={currentSentenceIdx}
          />
        )}
      </div>
      <div>
        <Controls
          loadNewContent={loadNewContent}
          play={play}
          pause={pause}
          state={"initialized"}
        />
      </div>
    </div>
  );
}

export default App;
