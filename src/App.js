import './App.css';
import { Component } from 'react';
import Row from './components/Row.component';


class App extends Component {

  state = {
    automata: {
      alfabeto: [],
      states: [],
      transitions: [],
      initialState: '',
      acceptanceStates: []
    },
    cantidadAlfabeto: 0,
    inputsAlphabet: [],
    inputsRow: [],
    cantidadEstados: 0,
  };

  handlerNumberStates = (event) => {
    const nStates = event.target.value;
    this.setState((prevState) => {

      const automata = {
        ...prevState.automata,
        acceptanceStates: [],
        transitions: [],
        states: [],
        initialState: ''
      }

      return {
        ...prevState,
        cantidadEstados: nStates,
        inputsRow: [],
        automata
      }

    });



    for (let i = 0; i < nStates; i++) {

      this.setState((prevState) => {
        return {
          ...prevState,
          inputsRow: [...prevState.inputsRow, Row({
            i,
            setStates: this.setStates,
            setTransitions: this.setTransitions,
            nAlphabet: prevState.cantidadAlfabeto
          })]
        }
      });
      
    }

  }

  setStates = (i) => {
    return (e) => {
      const state = e.target.value;

      this.setState((prevState) => {
        const automata = {
          ...prevState.automata,
          states: state.length > 1 && state.includes('*') ? this.setArray(i, state.split('')[1], prevState.automata.states) : this.setArray(i, state, prevState.automata.states),
          initialState: i === 0 ? state : prevState.automata.initialState,
          acceptanceStates: state.length > 1 && state.includes('*') 
            ? this.setArray(i, state.split('')[1], prevState.automata.acceptanceStates)
            : prevState.automata.acceptanceStates,
        };

        return {
          ...prevState,
          automata
        }
      })

    }
  }

  setTransitions = (i, j) => {
    return (e) => {
      const transition = e.target.value;
      
      this.setState((prevState) => {
        const prevAutomata = prevState.automata

        const automata = {
          ...prevAutomata,
          transitions: {
            ...prevAutomata.transitions,
            [prevAutomata.states[i]]: {
              ...prevAutomata.transitions[prevAutomata.states[i]],
              [prevAutomata.alfabeto[j]]: transition
            }
          }
        };

        return {
          ...prevState,
          automata
        }
      })
    }
  }

  setArray = (i, value, array) => {
    const newArray = array;
    newArray[i] = value;
    return newArray;
  }

  setAlPhabet = (i) => {
    return (e) => {
      const value = e.target.value;
      this.setState((prevState) => {
        const automata = {
          ...prevState.automata,
          alfabeto: this.setArray(i, value, prevState.automata.alfabeto)
        }

        return {
          ...prevState,
          automata
        }
      });
      console.log(this.state.automata);
    }
  }


  handlerAlphabet = (event) => {

    const value = event.target.value;
    this.setState({
      cantidadAlfabeto: value,
      inputsAlphabet: []
    });

    for (let i = 0; i < value; i++) {
      this.setState((prevState) => {
        return {
          ...prevState,
          inputsAlphabet: [...prevState.inputsAlphabet, <input key={i} type="text" placeholder={`Caracter ${i + 1}`} onChange={this.setAlPhabet(i)}/>]
        }
      });
    }



  }


  handlerIsAceptation = (event) => {
    // const resultado = event.target.value;
  }

  render() {

    const { inputsAlphabet, inputsRow } = this.state;

    return (
      <div className="App container" >
        <div className="mt-5">

          <div>
            <p>Ingresa la cantidad de letras del alfabeto </p>
            <input type="text" onChange={this.handlerAlphabet} placeholder="Numero de letras del alfabeto" />
            <div id="alphabet">
              {inputsAlphabet} 
            </div>
          </div>

          <div className="m-5">
            <p>Ingresa la cantidad de estados </p>
            <input type="text" onChange={this.handlerNumberStates} placeholder="Numero de estados" />
            <div id="InputsStates">
              {inputsRow}
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default App;
