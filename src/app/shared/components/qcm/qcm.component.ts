import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  standalone: true,
  imports: [NgClass, NgIf, NgForOf],
  styleUrls: ['./qcm.component.scss'],
})
export class QcmComponent implements OnInit, OnChanges {
  @Input() qcm: any; // L'objet QCM passé en entrée
  currentQuestionIndex = 0;
  currentAnswerIndex = -1;
  isAnswered = false;

  ngOnInit(): void {
    this.resetQcm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['qcm'] && changes['qcm'].currentValue) {
      this.resetQcm();
    }
  }

  resetQcm(): void {
    this.currentQuestionIndex = 0;
    this.currentAnswerIndex = -1;
    this.isAnswered = false;
  }

  selectAnswer(answerIndex: number): void {
    if (!this.isAnswered) {
      this.currentAnswerIndex = answerIndex;
      this.isAnswered = true;
    }
  }

  isCorrect(answerIndex: number): boolean {
    return this.qcm.questions[this.currentQuestionIndex].correctAnswerIndex === answerIndex;
  }

  getCorrectAnswer(): string {
    return this.qcm.questions[this.currentQuestionIndex].answers[this.qcm.questions[this.currentQuestionIndex].correctAnswerIndex];
  }

  nextQuestion(): void {
    this.isAnswered = false;
    this.currentAnswerIndex = -1;
    this.currentQuestionIndex++;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.isAnswered = false;
      this.currentAnswerIndex = -1;
      this.currentQuestionIndex--;
    }
  }
}
