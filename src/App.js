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
    alertStates: false
  };

  handlerNumberStates = (event) => {
    const nStates = event.target.value;
    this.setState((prevState) => {
      const automata = {
        ...prevState.automata,
        acceptanceStates: [],
        transitions: [],
        states: [],
        initialState: '',
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

    this.setState({ 
      alertStates: true
    })

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
          inputsAlphabet: [...prevState.inputsAlphabet, <div className="col"><input key={i} type="text" className="form-control" placeholder={`Caracter ${i + 1}`} onChange={this.setAlPhabet(i)} /></div>]
        }
      });
    }



  }

  getAFD = async () => {
    console.log(this.state.automata);
    const { data: AFD } = await axios('http://192.168.1.78:3001/api/transform', {
        method: 'POST',
        data: this.state.automata
    });

    this.setState({
      AFD
    });
  }

  render() {

    const alert = <div className="alert alert-primary t-left" role="alert">
                      <ul>
                        <li>El primer estado es inicial</li>
                        <li>Para que un estado sea de aceptación ingrese "*" como primer caracter</li>
                        <li>Ejemplo de estado de aceptación: *p</li>
                      </ul>
                  </div> ;

    const operacionAlert = this.state.alertStates === true ? alert : "";

    const { inputsAlphabet, inputsRow, AFD } = this.state;
    let table = <table></table>
    if (AFD) {
      table = Table({ AFD });
    }
    console.log(this.state.alertStates)


    const tableHead = this.state.automata.alphabet.map((alpa) => <th>{alpa}</th>)

    const tableStatesTransitions = <table className="table table-dark table-striped mt-4">
                                    <thead>
                                        <tr>
                                          <label className="badge bg-primary text-wrap m-1">Cabecera</label>
                                          <th></th>
                                          {tableHead}
                                        </tr>   
                                    </thead>
                                    <tbody>
                                      {inputsRow}
                                    </tbody> 
                                  </table>;

    return (

      <div>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <h4 className="text-shadow">Tabla equivalente AFND a AFD</h4>
          </div>
        </nav>
     
      
        <div className="App container">
          <div className="mt-3">
            <div className="containerAlphabet">
          
              <h4 className="text-shadow">Ingresa la cantidad de letras del alfabeto </h4>
              <input type="text" className="form-control" onChange={this.handlerAlphabet} placeholder="Numero de letras del alfabeto" />
              <div id="alphabet" className="m-3 row">
                {inputsAlphabet}
              </div>
            </div>

            <div className="m-5 d-flex flex-column justify-content-center align-items-center">
            
              <h4 className="text-shadow">Ingresa la cantidad de estados </h4>
              <input type="text" className="form-control" onChange={this.handlerNumberStates} placeholder="Numero de estados" />
              <div id="InputsStates" className="m-3 container">
                {
                  this.state.cantidadEstados > 0 ? operacionAlert : ""
                }
                <div className="m-4">
                  {this.state.cantidadEstados > 0 ? tableStatesTransitions : ""}
                </div>
              </div>
            </div>
            

            {table}

          </div>
          
          <button onClick={this.getAFD} className="btn btn-primary">Tranformar a tabla AFD</button>

        </div>
      </div>
    )
  }
}

export default App;
