import React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {Button} from "@mui/material";
import { useParams } from "react-router-dom";
import Won from "../PopUps/Won";
import WinningPercentage from "./winningPercentage";
import PriorityQueue from "js-priority-queue";
import HashSet from "hashset";

function Home(){
    const [numbers, setNumbers] = useState([[1,2,3,4],[0,5,7,8],[9,6,11,12],[13,10,14,15]]);
    const [randomState, setRandomState] = useState(true);
    const {mail} = useParams();
    const [user, setUser] = useState({});
    const [gameOver, setGameOver] = useState(false);
    const [possiblity, setPossiblity] = useState(0)                                                 //it will track our win percentage
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem(mail)))                                             //get a user data from localstorage
    },[])
    if(randomState){
        // numbers.sort(() => Math.random()-0.4)
        // numbers.map((element) => element.sort(() => Math.random()-0.4))                          //we can use this feature for shuffle the numbers
        setNumbers([[1,2,3,4],[0,5,7,8],[9,6,11,12],[13,10,14,15]])
        setRandomState(false)
    }
    useEffect(() => {
        if(JSON.stringify(numbers) === JSON.stringify([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]])){            //this function is trancking the state of the game
            setGameOver(true)
            setPossiblity(100)
        }else{
            var count=0;
            function arSort(arr,n){
                if(n===1 || n===0)
                    return 1
                if(arr[n-1] < arr[n-2])
                    return 0
                return arSort(arr, n-1)
            }
            numbers.map((row) => {
                if(arSort(row, row.length) !== 0){
                    count = count + 30;
                }
            })
            setPossiblity(count)
        }
    },[numbers])

    console.log(possiblity)
    

    function slide(row,col,currentNumber){                                                          //this function is handling the slide of the numbers
        if(numbers[row][col+1]!==undefined&&numbers[row][col+1]===0){                               //Right slide
            setNumbers(prev => {
                return prev.map((rowAr, rowIndex) => {
                    if(rowIndex === row){
                        let temp = currentNumber
                        let newRow = rowAr
                        newRow[col] = 0
                        newRow[col+1] = temp
                        return rowAr
                    }else{
                        return rowAr
                    }
                })
            })
        }
        else if(numbers[row][col-1]!==undefined&&numbers[row][col-1]===0){                          //left slide
            console.log(true)
            setNumbers(prev => {
                return prev.map((rowAr, rowIndex) => {
                    if(rowIndex === row){
                        let temp = currentNumber
                        let newRow = rowAr
                        newRow[col] = 0
                        newRow[col-1] = temp
                        return newRow
                    }else{
                        return rowAr
                    }
                })
            })
        }
        else if(numbers[row+1]!==undefined&&numbers[row+1][col]===0){                                 //down slide
            console.log(true)
            setNumbers(prev => {
                return prev.map((rowAr, rowIndex) => {
                    if(rowIndex === row+1){
                        let newRow = rowAr
                        console.log(currentNumber)
                        newRow[col] = currentNumber
                        return newRow
                    }
                    else if(rowIndex === row){
                        let newRow = rowAr
                        newRow[col] = 0
                        return newRow
                    }    
                    else{
                        return rowAr
                    }
                })
            })
        }
        else if(numbers[row-1]!==undefined&&numbers[row-1][col]===0){                               //up slide
            console.log(true)
            setNumbers(prev => {
                return prev.map((rowAr, rowIndex) => {
                    if(rowIndex === row){
                        let newRow = rowAr
                        newRow[col] = 0
                        return newRow
                    }else if(rowIndex === row-1){
                        let newRow = rowAr
                        newRow[col] = currentNumber
                        return newRow
                    }    
                    else{
                        return rowAr
                    }
                })
            })
        }
        else{
            alert("You can't move this tile");                                          //it will alert if we click the tile thats not supposed to be
        }
    }

    //A* algorithm     

    return(
        <div className="home">
            <Won visible={gameOver} setVisible={setGameOver} restart={setRandomState} />
            <div style={{position:'absolute', color:'white',top:'1rem',right:'1rem'}}>
                <Typography variant="h7">{user.email}</Typography><br/><br/>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => window.location.href='/'}
                    style={{color:'#FAAB78', border: '1px solid #FAAB78'}}>Logout</Button>
            </div>
            <Typography variant="h2" style={{color:'#FAAB78',marginTop:'3rem'}}>Puzzles</Typography>
            <table className="puzzles">
                <tbody>
                {numbers&&numbers.map((rows, rowIndex) =>
                    <tr key={rowIndex}>
                        {rows&&rows.map((column, colIndex) => <td 
                            key={colIndex} 
                            style={{color:column===0&&'red'}}
                            onClick={() => slide(rowIndex,colIndex,column)}>{column}</td>)}
                    </tr>
                )}
                </tbody>
            </table>
            <WinningPercentage value={possiblity} />
            <Button 
                variant="contained" 
                size='small'
                style={{position:'absolute', top:'31rem', left:'45rem', backgroundColor:'#FAAB78', fontWeight:'bolder'}} 
                onClick={()=> setRandomState(true)}>Restart</Button>
        </div>
    )
}
export default Home;