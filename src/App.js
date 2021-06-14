import './App.css';
import { Component } from 'react';
import Row from './components/Row.component';
import Table from './components/Table.component';
import axios from 'axios';


class App extends Component {

  state = {
    automata: {
      alphabet: [],
      states: [],
      transitions: [],
      initialState: '',
      acceptanceStates: []
    },
    AFD: null,
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
          states: state.includes('*') 
            ? this.setArray(i, state.split('*')[1], prevState.automata.states)
            : this.setArray(i, state, prevState.automata.states),
          initialState: i === 0 ? state : prevState.automata.initialState,
          acceptanceStates: state.includes('*')
            ? this.setArray(i, state.split('*')[1], prevState.automata.acceptanceStates)
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
          transitions: this.setArray(i, { ...prevAutomata.transitions[i], [prevAutomata.alphabet[j]]: transition }, prevAutomata.transitions)
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
          alphabet: this.setArray(i, value, prevState.automata.alphabet)
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
          inputsAlphabet: [...prevState.inputsAlphabet, <input key={i} type="text" placeholder={`Caracter ${i + 1}`} onChange={this.setAlPhabet(i)} />]
        }
      });
    }



  }

  getAFD = async () => {
    console.log(this.state.automata);
    const { data: AFD } = await axios('http://192.168.100.4:3001/api/transform', {
        method: 'POST',
        data: this.state.automata
    });

    this.setState({
      AFD
    });
  }

  render() {

    const { inputsAlphabet, inputsRow, AFD } = this.state;
    let table = <table></table>
    if (AFD) {
      table = Table({ AFD });
    }

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

          <button className="btn btn-primary" onClick={this.getAFD}>Crear tabla de transiciones de AFD</button>

          {table}

        </div>

      </div>
    )
  }
}

export default App;
