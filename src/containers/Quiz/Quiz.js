import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz';
import Loader from './../../components/UI/Loader/Loader';
// import axios from '../../axios/axios-quiz';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';

// export default class Quiz extends Component{
class Quiz extends Component {
    // state = {
    //     results: {},
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null,
    //     quiz: [],
    //     loading: true,
    // };

    // onAnswerClickHandler = answerId => {
    // if (this.state.answerState) {
    //     const key = Object.keys(this.state.answerState)[0];
    //     if (this.state.answerState[key] === 'success') {
    //         return;
    //     }
    // }

    // const question = this.state.quiz[this.state.activeQuestion];
    // const results = this.state.results;

    // if (question.rightAnswerId === answerId) {
    //     if (!results[question.id]) {
    //         results[question.id] = 'success';
    //     }

    //     this.setState({
    //         answerState: {[answerId]: 'success'},
    //         results,
    //     });

    //     const timeout = window.setTimeout(() => {
    //         if (this.isQuizFinished()) {
    //             this.setState({
    //                 isFinished: true,
    //             });
    //         } else {
    //             this.setState({
    //                 activeQuestion: this.state.activeQuestion + 1,
    //                 answerState: null,
    //             });
    //         }

    //         window.clearTimeout(timeout);
    //     }, 1000);
    // } else {
    //     results[question.id] = 'error';
    //     this.setState({
    //         answerState: {[answerId]: 'error'},
    //         results,
    //     });
    // }
    // };

    // isQuizFinished() {
    //     return this.state.activeQuestion + 1 === this.state.quiz.length;
    // }

    // retryHandler = () => {
    //     this.setState({
    //         results: {},
    //         isFinished: false,
    //         activeQuestion: 0,
    //         answerState: null,
    //     });
    // };

    // async componentDidMount() {
    // try {
    //     const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
    //     const quiz = response.data;

    //     this.setState({
    //         quiz,
    //         loading: false,
    //     });
    // } catch (e) {
    //     console.log(e);
    // }
    // }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>???????????????? ???? ?????? ??????????????</h1>

                    {/* {this.state.loading ? (
                        <Loader />
                    ) : this.state.isFinished ? (
                        <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.retryHandler} />
                    ) : (
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )} */}

                    {this.props.loading || !this.props.quiz ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
