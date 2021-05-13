import React from 'react';
import styles from './options.module.scss';
import { Select } from "@chakra-ui/react"
import PropTypes from 'prop-types';

const Options = ({qty,dif,handlecat}) => {
    return(
    <section className={styles.optionsWrap}>
        <p>Game will start when you select a category</p>
        <form>
            <div className={styles.option}>
                <label htmlFor="howmany">
                    <span>Quantity</span><br/>
                    <Select variant="outline" size="lg" name="howmany" id="howmany" onChange={(e) => qty(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </Select>
                </label>
            </div>
            <div className={styles.option}>
                <label htmlFor="howhard">
                    <span>Difficulty</span><br/>
                    <Select variant="outline" size="lg" name="howhard" id="howhard" onChange={(e) => dif(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </Select>
                </label>
            </div>
            <div className={styles.option}>
                <label htmlFor="whichCat">
                    <span>Category</span><br/>
                    <Select variant="outline" size="lg" name="whichCat" id="whichCat" onChange={(e) => handlecat(e.target.value, e.target.options[e.target.selectedIndex].text)}>
                        <option value="">Select</option>
                        <option value="12">Music</option>
                        <option value="11">Films</option>
                        <option value="14">TV</option>
                        <option value="23">History</option>
                    </Select>
                </label>
            </div>
        </form>
    </section>
    )
}
Options.propTypes = {
    qty: PropTypes.func.isRequired,
    dif: PropTypes.func.isRequired,
    handlecat: PropTypes.func.isRequired
  }
export default Options;