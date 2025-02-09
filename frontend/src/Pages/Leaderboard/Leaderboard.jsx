"use client"
import { useState } from 'react'
import './Leaderboard.css'
import './coolfirework.css'

export default function Leaderboard(){
    const [easterEgg, setEasterEgg] = useState(false);

    if(easterEgg){
        return (
            <div id='leaderboard-page-fix'>
                <img id='easter-egg-img' src={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnYyMzdiZW40MGkwcnhqbDlwZjMzbHp1MDRwenc5ZTlxM2w2c3FzMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yASFCj2K0MGeASqSom/giphy.gif'} />
                <div className='firework'></div>
                <div className='firework'></div>
                <div className='firework'></div>
                <ActualStuff />
            </div>
        )
    }else{
        return (
            <div id='leaderboard-page-fix'>
                <ActualStuff activateEasterEgg={setEasterEgg} />
            </div>
            
        )
    }
    
}

export function ActualStuff(props){
    return (
        <div id='leaderboard-page-fix-inner'>
            <div id='leaderboard-top-thingy'></div>
            <div id='leaderboard-container'>
                <a id='leaderboard-title' onClick={() => props.activateEasterEgg(true)}>Leaderboard</a>
                <div id='leaderboard-entry-master-container'>
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                    <LeaderBoardEntry name={'Username here'} wins={69} losses={420} />
                </div>
            </div>
    </div>
    )   
}

export function LeaderBoardEntry(props){
    return (
        <div className='leaderboard-entry-container'>
            <a className='leaderboard-entry-text' id='leaderboard-entry-name'>{props.name}</a>
            <a className='leaderboard-entry-text' id='leaderboard-entry-wins'>Wins:{props.wins}</a>
            <a className='leaderboard-entry-text' id='leaderboard-entry-losses'>Losses: {props.wins}</a>
        </div>
    )
}