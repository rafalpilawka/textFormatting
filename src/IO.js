import React, { Component } from 'react'



export class IO extends Component {
         state = {
           textInput: "",
           textOutput: "",
           data: {},
           alert: false,
           markers: ["{{", "}}"]
         };

         changeHandler = e => {
           e.preventDefault();
           this.setState({ textInput: e.target.value });
         };

         
         updateOutput = () => {
           console.log(this.state.textInput.split(" "));
           this.setState({
             textOutput: this.state.textInput.split(" ")
           });
         };


         componentDidMount() {
           console.log("componentDidMount");
           fetch("https://api.coinpaprika.com/v1/coins")
             .then(res => res.json())
             .then(data => {
               this.setState({ data }, () =>
                 console.log(this.state.data)
               );
             })
             .catch(err => {
               console.log(err);
             });
         }

         checkRegex = () => {
           this.setState({ alert: false });
           let data = this.state.data;
           console.log("state-data-25662", this.state.data);
           console.log(this.state.textInput);
           // let formula = /ab/g

           let regFormula = `(?<=${this.state.markers[0]} )(.*?)(?= ${
             this.state.markers[1]
           })`;
           // let formula = /(?<=\{{ )(.*?)(?= }})/g  // GOOD FORMULA
           let formula = new RegExp(regFormula, "g");

           let text = this.state.textInput;
           let found = text.match(formula);
           let names;
           if (found) {
             found = found.map(str => str.toUpperCase());
           }
           console.log("found-45454", found);
           console.log(this.state.data[0].symbol);
           if (found) {
             names = found.map(id => {
               console.log(id);
               let result = data.find(key => {
                 return key.symbol === id;
               });
               return result.name;
             });
           }

           if (names) {
             names.map(name => {
               console.log(name);
               // let singleFormula = /{{\s(.*?)\s}}/
               let singleFormula = new RegExp(
                 `${this.state.markers[0]} (.*?) ${
                   this.state.markers[1]
                 }`,
                 "g"
               );
               let found1String = text.match(singleFormula);
               console.log(found1String[0]);
               text = text.replace(found1String[0], name);
               console.log(text);
               this.setState({ textInput: text });
               return text;
             });
           } else {
             this.setState({ alert: true });
           }
           this.setState({ textInput: text });
         };


         handleKeyPress(event) {  //PREVENTING FROM RELOADING
           if (event.keyCode === 13) {
             event.preventDefault();
           }
         }

         render() {
        
           let data = this.state.data;
           let alert = this.state.alert ? (
             <h1>No text to format</h1>
           ) : null;

           return (
             <div>
               <form>
                 <input
                   className="IO"
                   type="text"
                   value={this.state.textInput}
                   id="in"
                   onChange={this.changeHandler}
                   onKeyDown={this.handleKeyPress}
                 />
               </form>
               <select name="symbols" id="symbols">
                 {Object.keys(data).map(key => {
                   return (
                     <option
                       key={data[key].symbol + key}
                       value={data[key].symbol}
                     >
                       {data[key].symbol}
                     </option>
                   );
                 })}
               </select>
               <div>{alert}</div>
               <button onClick={this.checkRegex}>Format text</button>
             </div>
           );
         }
       }

export default IO

