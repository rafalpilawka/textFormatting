import React, {useCallback} from 'react'


export const Output = ({text, data, markers}) => {
  const [state, setState] = React.useState('')

  React.useEffect(() => {
    const checkRegex = () => {

      let regFormula = `(?<=${markers[0]})(.*[a-z]{3})(?=${markers[1]})`;
      // let formula = /(?<=\{{ )(.*?)(?= }})/g  // GOOD FORMULA
      let formula = new RegExp(regFormula, 'g');
      let found = text.match(formula);
      let names;
      if (found) {
        found = found.map(str => str.toUpperCase());
      }
      if (found) {
        names = found.map(id => {
          let result = data.find(key => {
            return key.symbol === id;
          });
          return result ? result.name : null;
        });
      }

      if (names) {
        names.map(name => {
          let singleFormula = new RegExp(
            `${markers[0]}(.*?)${markers[1]}`,
            'g'
          );
          let found1String = text.match(singleFormula);
          text = text.replace(found1String[0], name);
          // this.setState({ textInput: text });
          return text;
        });
      } else {
        // this.setState({ alert: true });
      }
      // this.setState({ textInput: text });
      setState(text)
    };
    checkRegex()
  }, [text])
  
  
  return (
    <div>
      {state}
    </div>
  )
}
