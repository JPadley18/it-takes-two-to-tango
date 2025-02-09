import React from "react";
import styles from "./styles/tutorial.module.css";

const Tutorial = () => {
    return (
        <>
            <h1> How to <span>Play!</span></h1>
            <div className={styles.container}>
                <div className={styles.paragraph1}>
                    <span>1.</span> Fill the grid so that each cell contains either a play or pause
                    
                </div>

                <div className={styles.paragraph2}>
                    <span>2.</span> No more than 2 plays or pauses may be next to each other, either vertically or horiznotally
                </div>
                <div className={styles.paragraph1}>
                    <span>3.</span> Each row and column must contain the same number of plays and pauses
                </div>
                <div className={styles.paragraph2}>
                    <span>4.</span> Cells separated by an = sign MUST be of the same type
                </div>
                <div className={styles.paragraph1}>
                    <span>5.</span> Cells separated by X sign MUST be of the opposite type
                </div>
                <div className={styles.paragraph2}>
                    <span>6.</span> Each puzzle has one right answer and can be solved via deducation
                </div>
            </div>
                <a href="/">
                    <button className={styles.Buttonlayout}>Back</button>
                </a>
        </>
    );
};

export default Tutorial;
