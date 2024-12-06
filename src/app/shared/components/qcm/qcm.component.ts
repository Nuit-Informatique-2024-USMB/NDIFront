import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.scss']
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
    }
  }

  isCorrect(answerIndex: number) {
    return this.qcm.questions[this.currentQuestionIndex].correctAnswerIndex === answerIndex;
  }

  nextQuestion() {
    if (this.isAnswered) {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.currentAnswerIndex = -1;
    } else {
      this.isAnswered = true;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.isAnswered = false;
      this.currentAnswerIndex = -1;
    }
  }
}
