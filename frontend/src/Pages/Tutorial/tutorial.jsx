import React from "react";
import styles from "./styles/tutorial.module.css";
import one from './examples/one.png';
import two from './examples/two.png';
import three from './examples/three.png';
import four from './examples/four.png';
import five from './examples/five.png';
import six from './examples/six.png';
import './funnything.css'
import { useState } from "react";

const Tutorial = () => {
    const [bannerImg, setBannerImg] = useState(null);
    const [bannerActive, setBannerActive] = useState(false);

    return (
        <>
            <h1> How to <span>Play!</span></h1>
            <div className={styles.container}>
                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(one); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>1.</span> Fill the grid so that each cell contains either a play or pause
                </div>

                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(two); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>2.</span> No more than 2 plays or pauses may be next to each other, either vertically or horiznotally
                </div>
                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(three); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>3.</span> Each row and column must contain the same number of plays and pauses
                </div>
                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(four); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>4.</span> Cells separated by an = sign MUST be of the same type
                </div>
                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(five); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>5.</span> Cells separated by X sign MUST be of the opposite type
                </div>
                <div className={'paragraph1'} onMouseEnter={() => {setBannerImg(six); setBannerActive(true)}} onMouseLeave={() => {setBannerActive(false)}}>
                    <span>6.</span> Each puzzle has one right answer and can be solved via deducation
                </div>
                <SideBanner active={bannerActive} bannerImg={bannerImg} />
            </div>
                <a href="/">
                    <button className={styles.Buttonlayout}>Back</button>
                </a>
        </>
    );
};

export function SideBanner(props){
    if(props.active){
        
    }
    return (
        <img id={'imageBanner'+(props.active?'':'-hidden')} src={props.bannerImg} />
    )
}

export default Tutorial;
