import './App.css';
import { Component } from 'react';


class App extends Component {

  constructor(props) {
    super(props);
  }

  
  state = {
    automata: {
      alfabeto: ['', '0', '1'],
      states: [],
      transitions: {},
      initialState: '',
      acceptanceStates: []
    },
    rows:1,
    columns: 1,
    add: false,
    cantidadAlfabeto: 0,
    cantidadEstados: 0,
  };

  // myTable = document.querySelector("table"); 

  columns = this.state.automata.alfabeto.map((alfa) => <th scope="col">{alfa}</th>);

  // valorEstado = (event) => {
  //   alert("hola");
  //   console.log("hola");
  // }

  valorEstado = () => {

    console.log("Hola");
    
  }

  handlerNumberStates = (event) => {
    const resultado = event.target.value;
    this.setState({
      cantidadEstados: resultado,
    });

    let inputs= "";
    // let array = [];

    for(let i=0; i<resultado; i++) {

      inputs += `<div>`;
      inputs += `<label>Estado ${i+1}</label>`

      if(i === 0) {
        inputs += `<input type="text" placeholder="Ingrese el estado inicial" onChange={this.valorEstado} />`
        // array.push(inputs);
      } else {
        inputs += `<input type="text" placeholder="Ingrese el estado ${i+1}" onChange=\"this.valorEstado\" />`
        // array.push(inputs);
      }
      
      for(let x=0; x<this.state.cantidadAlfabeto; x++) {
        inputs += `<input type="text" placeholder="ruta ${x+1}"/>`;
      }

      inputs += `</div>`

      // array.push(i);

      
    }

    // console.log(array);

    // const double = array.map((arreglo) => {
    //   return <input type="text" onChange={this.valorEstado} />
    // })

    // console.log([double]);

    document.getElementById("InputsStates").innerHTML = inputs;

  }


  handlerAlphabet = (event) => {

    const resultado = event.target.value;
    this.setState({
      cantidadAlfabeto: resultado,
    });

    let contador = "";
    for(let i=0; i<resultado; i++) {
      contador += `<input type="text" placeholder="Caracter ${i+1}"/>`;
    }

    document.getElementById("alphabet").innerHTML = contador;

    return doubled;

  }


  handlerIsAceptation = (event) => {
    // const resultado = event.target.value;
  }

  render() {

    return (
      <div className="App container" >
        <div className="mt-5">

          <div>
            <p>Ingresa la cantidad de letras del alfabeto </p>
              <input type="text" onChange={this.handlerAlphabet} placeholder="Numero de letras del alfabeto" />
              <div id="alphabet">
              </div>
          </div>

          <div className="m-5">
              <p>Ingresa la cantidad de estados </p>
              <input type="text" onChange={this.handlerNumberStates} placeholder="Numero de estados" />
              <div id="InputsStates">
              </div>
          </div>
          
        </div>

      </div>
    )
  }
}

export default App;
