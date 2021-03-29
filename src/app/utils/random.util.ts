export function getRandomDate(): Date {
  return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
}
export function getRandomNumber(start: number, finish: number): number {
  return Math.floor(Math.random() * finish) + start;
}

export function getRandomWord(): string {
  return words[getRandomNumber(0, words.length)];
}

export function getRandomSentence(amountOfWords: number): string {
  let randomSentence = '';
  for (let i = 0; i < amountOfWords; i++) {
    randomSentence += getRandomWord() + (i === amountOfWords - 1 ? '' : ' ');
  }
  randomSentence =
    randomSentence[0].toUpperCase() +
    randomSentence.slice(1, randomSentence.length);
  return randomSentence;
}

const sentence =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit Cras ut nisi lacinia pharetra elit vitae pulvinar nisi Sed enim erat ultricies vitae venenatis eu porttitor vel sem Pellentesque interdum pretium justo quis aliquet Nullam eu luctus lectus Duis sit amet dignissim lectus Fusce convallis iaculis tincidunt Proin auctor justo facilisis dolor laoreet pellentesque Suspendisse ut lorem nec enim feugiat mollis ut facilisis quam';

const words = sentence.toLowerCase().split(' ');
