// time after making a guess until next song starts
const numSecondsAfterGuess = 5;
// how many questions a quiz should include
const numSongsToGuess = 5;

function extractFirst20Lines(songText) {
  const lines = songText.split("\n");
  const firstLines = lines.splice(0, 20);
  return firstLines.join(" ");
}

export { numSongsToGuess, numSecondsAfterGuess, extractFirst20Lines };
