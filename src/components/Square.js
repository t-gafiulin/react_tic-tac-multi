import React from "react";


const Square = ({ val, handleClick, squaresWidth, row, col }) => {
    return <input type="button"
        onClick={handleClick.bind(null, row, col)}
        className="square"
        value={val}
        style={{width: squaresWidth + '%', height: squaresWidth + '%'}}
    />;
}

export default Square;