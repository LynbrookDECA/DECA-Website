/**
 * Created by Avinash on 11/7/17.
 */
class Question{
    constructor(text, optionA, optionB, optionC, optionD, rightAnswer) {
        this.text = text;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.rightAnswer = rightAnswer;
    }



    getText() {
        return this.text;
    }

    getOptionA() {
        return this.optionA;
    }
    getOptionB() {
        return this.optionB;
    }

    getOptionC() {
        return this.optionC;
    }

    getOptionD() {
        return this.optionD;
    }

    getRightAnswer() {
        return this.rightAnswer;
    }

}