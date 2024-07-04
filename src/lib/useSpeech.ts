import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
let currentSentenceIdx = 0;
const useSpeech = (sentences: Array<string>) => {
  // const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] =
    useState<PlayingState>("paused");

  const onBoundary = (e: SpeechSynthesisEvent) => {
    setCurrentWordRange(() => [e.charIndex, e.charIndex + e.charLength]);
  };
  const onEnd = async (e: SpeechSynthesisEvent) => {
    setPlaybackState("ended");
    if (currentSentenceIdx <= sentences.length - 1) {
      load(sentences[currentSentenceIdx]);
      playSpeech();
      setPlaybackState("playing");
    } else {
      currentSentenceIdx = 0;
    }
  };
  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
    if (state === "ended" && currentSentenceIdx <= sentences.length - 1) {
      currentSentenceIdx++;
    }
  };
  const {
    play: playSpeech,
    pause: pauseSpeech,
    load,
    cancel,
  } = createSpeechEngine({
    onBoundary,
    onEnd,
    onStateUpdate,
  });

  const play = () => {
    let currentSentence = "";
    if (sentences && playbackState !== "ended") {
      // first time play
      setPlaybackState("initialized");
      currentSentence = sentences[currentSentenceIdx];
      load(currentSentence);
      playSpeech();
      setPlaybackState("playing");
    }
    if (playbackState === "paused") {
      const remainingSentence = currentSentence.substring(
        currentWordRange[0],
        currentSentence.length
      );
      load(remainingSentence);
      playSpeech();
    }
    if (playbackState === "ended") {
      setPlaybackState((state) => "playing");
      currentSentenceIdx = 0;
      load(sentences[currentSentenceIdx]);
      playSpeech();
      setPlaybackState("playing");
    }
  };
  const pause = () => {
    pauseSpeech();
    setPlaybackState("paused");
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
