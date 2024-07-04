/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
import "../App.css";
export const CurrentlyReading = ({
  currentWordRange = [0, 0],
  currentSentenceIdx = 0,
  sentences = [],
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  let currSentence = sentences[currentSentenceIdx];
  const currentWord = currSentence?.substring(...currentWordRange);
  const FirstHalf = () => <>{currSentence.substring(0, currentWordRange[0])}</>;
  const SecondHalf = () => (
    <>
      {currSentence.substring(
        currentWordRange[0] + currentWordRange[1],
        currSentence.length
      )}
    </>
  );
  const CurrentWord = () => (
    <span className="currentword" data-testid="current-word">
      {currentWord}
    </span>
  );

  return (
    <div>
      {currentWord && (
        <div data-testid="current-sentence">
          <FirstHalf />
          <CurrentWord />
          <SecondHalf />
        </div>
      )}

      {sentences.map((e) => (
        <span key={e}>{e}</span>
      ))}
    </div>
  );
};
