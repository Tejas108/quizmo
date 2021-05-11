import React from 'react';
import { Button } from "@chakra-ui/react";
import styles from './play.module.scss';
import PropTypes from 'prop-types';

const PlayAgain = ({action}) => {
    return (
        <Button onClick={action} className={styles.btnPlay}>Play Again</Button>
      );
  };
  PlayAgain.propTypes = {
    action: PropTypes.func.isRequired
  }
  export default PlayAgain;