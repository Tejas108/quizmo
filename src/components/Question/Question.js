import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import styles from './questions.module.scss';
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

const Question = ({ question, incorrect, correct, count }) => {

    const [options, setOptions] = useState(incorrect);
    const [isDisabled, setButton] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isCorrect, setCorrect] = useState(null);

    useEffect(() => {
        setOptions(options => [...options, correct].sort(() => Math.random() - 0.5))
    }, [setOptions, correct]);

   const handleAnswer = (answer,correct) => {
        let score = localStorage.getItem('score');
        setButton(true);
        if(answer === correct){
            localStorage.setItem('score', ++score);
            setCorrectAnswer(correct);
            setCorrect(true);
        }else {
            setCorrect(false);
        }
    }
    return(
        <div className={styles.question}>
            <Box w="100%" borderWidth="1px" borderRadius="lg" mb="md" p="3" className={styles.box}>
                <h2><span>{renderHTML(question)}</span></h2>
                <ul className={styles.buttonList}>
                    {
                    options.map((answer) => (
                        <li key={uuidv4()}>
                            <Button size="sm" 
                                    _hover={{bg: "#1a7979"}} 
                                    disabled={isDisabled} 
                                    className={isCorrect && styles.btnCorrect} 
                                    onClick={() => {
                                            handleAnswer(answer,correct);
                                            setOptions([answer]);
                                            count()
                                            }
                                        }>{renderHTML(answer)}
                            </Button>
                        </li>
                    ))
                    }
                    <li>{isCorrect && <p className={styles.correctAnswer}><span>Correct!</span></p>}
                        {isCorrect == false && <p className={styles.incorrectAnswer}>Sorry, the correct answer is <span>{renderHTML(correct)}</span></p>}</li>
                </ul>
            </Box>
        </div>
    )
}
Question.propTypes = {
    question: PropTypes.string.isRequired,
    incorrect: PropTypes.array.isRequired,
    correct: PropTypes.string.isRequired,
    count: PropTypes.func.isRequired,
}
export default Question;