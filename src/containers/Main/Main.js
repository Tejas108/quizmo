import React, { Component } from 'react';
import Question from '../../components/Question/Question';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../../app.module.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Options from '../../components/Options/Options';
import Score from '../../components/Score/Score';
import { Spinner } from "@chakra-ui/react"

class Main extends Component {

    state = {
        questions: [],          
        isLoading: true,
        errMsg: '',
        done: false,
        finalScore: null,
        catId: null,
        catTitle: null,
        qty: 10,
        difficulty: 'easy',
        showScore: false
    }

    constructor () {
        super();
        this.handleCount = this.handleCount.bind(this);
        this.handleCat = this.handleCat.bind(this);
        this.handlePlayAgain = this.handlePlayAgain.bind(this);
    }
    componentDidMount(){
        this.handleApi();
        this.setState({isCat: null})
    }
    handleApi = (catId) => {
        console.log('handle api called');
        localStorage.setItem('score',0);
        localStorage.setItem('count',0);
        this.setState({
            done: false,
        });
        let qty = this.state.qty;
        let dif = this.state.difficulty;
        const api = `https://opentdb.com/api.php?amount=${qty}&category=${catId}&difficulty=${dif}&type=multiple`;
        axios
        .get(api)
        .then(res => {
            this.setState({
                questions: res.data.results,
                isLoading:false,
            })
        })
        .catch(err => {
            this.setState({errMsg: err.response.data.message})
        })
    }
    handleCount = () => {
        let count = localStorage.getItem('count');
        localStorage.setItem('count', ++count);
        if(localStorage.getItem('count') == this.state.qty){
            setTimeout(() => {
               this.setState({
                finalScore: localStorage.getItem('score'),
                isCat: null,
                showScore: true,
                done: true
            }); 
            }, 3000);
        }
    }
    handleQty = (qty) => {
        this.setState({qty});
    }
    handleDifficulty = (dif) => {
        this.setState({difficulty: dif});
    }
    handlePlayAgain = () => {
        localStorage.setItem('score',0);
        localStorage.setItem('count',0);
        this.setState({
            finalScore: null,
            catId: null,
            catTitle: null,
            qty: 10,
            showScore: false,
            done: true
        });
        this.handleApi();
    }
    handleCat = (catId) => {
       this.handleApi(catId);
        let title = "";
        switch(catId){
            case 12:
                title = 'Music';
                break;
            case 11:
                title = 'Films';
                break;
            case 14:
                title = 'TV';
                break;
            case 23:
                title = 'History';
                break;
                default:
        }
        console.log(title);
        this.setState({
            catId,
            catTitle: title
        });
    }
    render(){
        if(this.state.isLoading) {
            return <Spinner className={styles.spinner} size="xl"/>
        } else {            
        return(
        <div className={styles.mainWrap}>
            <Header />
            <main className={this.state.showScore ? styles.hideMe :  styles.showMe}>
            <ul>
            {   this.state.done === false &&
                this.state.questions.map(({question, incorrect_answers, correct_answer}) => (

                    <Question
                        question={question} 
                        incorrect={incorrect_answers} 
                        correct={correct_answer} 
                        key={uuidv4()}
                        count={this.handleCount}
                    />
                ))
            }
            </ul>
            </main>
            {   this.state.showScore === true &&
                <main>
                <Score
                    action={this.handlePlayAgain}
                    finalscore={this.state.finalScore}
                    show={this.state.showScore}
                />
                </main>
            }
            { 
                this.state.catId === null && 
                <main>
                    <Options 
                        qty={this.handleQty}
                        dif={this.handleDifficulty}
                        handlecat={this.handleCat}
                    />
                </main>
            }

            <Footer/>
        </div>
        )}
    }
}
export default Main;