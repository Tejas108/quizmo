import React from 'react';
import PropTypes from 'prop-types';
import PlayAgain from '../PlayAgain/PlayAgain';
import styles from './score.module.scss';

const Score = ({action,finalscore}) => {
    return(
    <div>
      <h2>Your Score: <span>{finalscore}</span></h2>
      <PlayAgain action={action}/>
    </div>
    )
}
Score.propTypes = {
  action: PropTypes.func,
  finalscore: PropTypes.string
}
export default Score; 