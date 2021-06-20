export class MasterMindGame {
  secret: number[];

  answers: string[] = [];

  gameSize: number = 4;
  showHints: boolean = true;
  invalidInputMessage: string = `Invalid input format, insert ${
    this.gameSize
  } digits`;
  constructor() {
    this.init();
  }

  public init() {
    //
    this.answers = [];
    this.secret = Array.from(Array(this.gameSize)).map(digit => {
      return Math.floor(Math.random() * 10);
    });
  }

  public isInvalidAnswer(userInput): boolean {
    let randomInput: unknown = <unknown>userInput.trim();
    return (
      // @ts-ignore
      !userInput || isNaN(randomInput) || userInput.length != this.gameSize
    );
  }

  /**
   * Play one round of MasterMind
   */
  public play(userInput: string) {
    if (this.isInvalidAnswer(userInput)) {
      throw new Error(this.invalidInputMessage);
    }
    this.answers.push(userInput);
    const clue = this.getClue(userInput);

    let output = this.formatPlayOutput(userInput, clue);
    if (userInput == this.secret.join('')) output += ', Game victory';
    return output;
  }

  /**
   * Main game logic
   */
  public getClue(validInput: string): string {
    // @ts-ignore
    let answer: number[] = [...validInput];
    let exactMatches: number = 0;
    let partialMatches: number = 0;
    let matches = [];
    for (let index = 0; index < this.gameSize; index += 1) {
      let digit = answer[index];
      let used: boolean = matches.some(m => m == digit); // 6
      // 5
      if (this.isExactMatch(index, answer, this.secret)) {
        // 1 & 3
        exactMatches++;
      } else if (this.isPartialMatch(index, answer, this.secret)) {
        // 2 & 4
        partialMatches++;
      } else {
        continue;
      }
      matches.push(answer[index]);
    }
    return (
      Array.from(Array(exactMatches))
        .map(m => '+')
        .join('') +
      Array.from(Array(partialMatches))
        .map(m => '-')
        .join('')
    );
  }

  private isExactMatch(
    index: number,
    answer: number[],
    secret: number[]
  ): boolean {
    // @ts-ignore
    if (secret[index] == answer[index]) return true;
    else return false;
  }

  private isPartialMatch(
    index: number,
    answer: number[],
    secret: number[]
  ): boolean {
    // @ts-ignore
    if (answer.some(a => a == secret[index])) return true;
    else return false;
  }

  private formatPlayOutput(answer, clue) {
    let out: string = '';
    if (this.showHints) {
      out += `Secret: ${this.secret.join('')}, `;
    }
    out += ` Submission: ${answer}, Clue: ${clue}`;
    return out;
  }
}
