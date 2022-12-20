import React from "react";
import ReactDOM from 'react-dom';
import { Typography } from "@mui/material";
import {Button} from "@mui/material";

function Won(props){
    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div>
                <Typography variant="h4">You Won!</Typography>
                <Button 
                    variant="contained" 
                    size="medium" 
                    onClick={() => {
                        props.restart(true)
                        props.setVisible(false)
                        }}>Play Again</Button>
            </div>
        </div>, document.getElementById('portal')
       
    )
}

export default Won;