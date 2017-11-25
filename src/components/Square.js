import React from "react";


const Square = ({ val, handleClick, squaresWidth, index }) => {
    return <input type="button"
        onClick={handleClick.bind(null, index)}
        className="square"
        value={val}
        style={{width: squaresWidth + '%', height: squaresWidth + '%'}}
    />;
}

export default Square;