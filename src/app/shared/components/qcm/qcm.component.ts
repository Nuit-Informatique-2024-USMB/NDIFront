import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  standalone: true,
  imports: [NgClass, NgIf, NgForOf],
  styleUrls: ['./qcm.component.scss'],
})
export class QcmComponent implements OnInit {
  @Input() qcm: any; // L'objet QCM passé en entrée
  currentQuestionIndex = 0;
  currentAnswerIndex = -1;
  isAnswered = false;

  ngOnInit(): void {
    if (this.qcm && this.qcm.questions) {
      this.currentQuestionIndex = 0; // Démarrer à la première question
    }
  }

  selectAnswer(answerIndex: number) {
    if (!this.isAnswered) {
      this.currentAnswerIndex = answerIndex;
      this.isAnswered = true;
    }
  }

  isCorrect(answerIndex: number) {
    return this.qcm.questions[this.currentQuestionIndex].correctAnswerIndex === answerIndex;
  }

  getCorrectAnswer() {
    return this.qcm.questions[this.currentQuestionIndex].answers[this.qcm.questions[this.currentQuestionIndex].correctAnswerIndex];
  }

  nextQuestion() {
    this.isAnswered = false;
    this.currentAnswerIndex = -1;
    this.currentQuestionIndex++;
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.isAnswered = false;
      this.currentAnswerIndex = -1;
      this.currentQuestionIndex--;
    }
  }
}
