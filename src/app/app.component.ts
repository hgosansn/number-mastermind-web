// @ts-nocheck
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MasterMindGame } from './mastermind';

@Component({
  selector: 'mastermind-ui',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('userInput') inputElement: ElementRef;

  session: MasterMindGame;

  attempts: string[] = [];
  hints: string;

  constructor() {
    this.reset();
    //this.unitTests();
  }

  unitTests() {
    let mastermind = new MasterMindGame();
    let testData = [
      { secret: '1243', answer: '1254', clue: '++-' },
      { secret: '1234', answer: '2002', clue: '-' },
      { secret: '1234', answer: '2200', clue: '+' },
      { secret: '3129', answer: '1249', clue: '+--' },
      { secret: '1234', answer: '1234', clue: '++++' },
      { secret: '2234', answer: '2234', clue: '++++' }
    ];
    testData.forEach(testPair => {
      mastermind.secret = [...testPair.secret];
      this.assert(
        mastermind.getClue(testPair.answer) == testPair.clue,
        testPair
      );
      this.attempts.push(mastermind.play(testPair.answer));
    });
  }

  assert(b, log) {
    if (!b) {
      throw new Error(log);
    }
  }

  reset() {
    this.session = new MasterMindGame();
    this.hints = '';
    this.attempts = ['New Mastermind game'];
  }

  keyPressed(event: KeyboardEvent) {
    let userInput = this.inputElement.nativeElement.value;
    try {
      const output = this.session.play(userInput);
      this.attempts.unshift(output);
    } catch (e) {
      this.hints = e.message;
    }
  }
}
