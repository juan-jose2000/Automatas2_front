import React from "react";

const Row = (props) => {

    const { i, setStates, setTransitions, nAlphabet } = props;
    
    let transitions = [];
    let inputState;
    
    const inputsForm = {
        background: "transparent",
        border: "none",
        textAlign: "center",
        color: "white"
    }

    if (i === 0) {
        inputState = <th scope="row"><input type="text" placeholder="Ingrese el estado inicial" onChange={setStates(i)} style={inputsForm}/></th>
    } else {
        inputState = <th scope="row"><input type="text" placeholder={`Ingrese el estado ${i + 1}`} onChange={setStates(i)} style={inputsForm}/></th>
    } 

    for (let x = 0; x < nAlphabet; x++) {
        transitions = [...transitions, <td><input key={x} type="text" placeholder={`ruta ${x + 1}`} onChange={setTransitions(i, x)} style={inputsForm}/></td>];
    }

    return (
        <>
                <tr>
                    <label className="badge bg-primary text-wrap m-1">Estado {i + 1}</label>
                    {inputState}
                    {transitions}
                </tr>
        </>
    );
}

export default Row;

