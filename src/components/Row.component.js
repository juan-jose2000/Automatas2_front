import React from "react";

const Row = (props) => {

    const { i, setStates, setTransitions, nAlphabet } = props;
    
    let transitions = [];
    let inputState;
    if (i === 0) {
        inputState = <input type="text" placeholder="Ingrese el estado inicial" onChange={setStates(i)} />
    } else {
        inputState = <input type="text" placeholder={`Ingrese el estado ${i + 1}`} onChange={setStates(i)} />
    } 

    for (let x = 0; x < nAlphabet; x++) {
        transitions = [...transitions, <input key={x} type="text" placeholder={`ruta ${x + 1}`} onChange={setTransitions(i, x)} />];
    }

    return (
        <div>
            <label>Estado {i + 1}</label>
            {inputState}
            {transitions}
        </div>
    );
}

export default Row;

