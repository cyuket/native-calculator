import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      resultText : "",
      calculationText : ""
      
    }
    this.operations = ["DEL", "/", "*", "-","+"]
  }
  operate(operation){
    switch(operation){
      case "DEL":
        let text = this.state.resultText.split('')
        text.pop()
        text.join('')
        this.setState({
          resultText:text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if (this.operations.indexOf(lastChar) >0) return
        if (this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + operation
        }) 
    }
      
  }
  clear(operation){
    switch(operation){
      case "DEL":
      this.setState({
        resultText:"",
        calculationText:""
      })
    }
  }
  calculaeResult(){
    const text = this.state.resultText
    let ans = eval(text)
    let value = ans.toString()
    this.setState({
      resultText: value,
      calculationText: ""
    })
  }
  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+' :
      // case '-' :
      case '*' :
      case '/' :
        return false
    }
    return true
  }
  buttonPressed(text){
    if (text == '=') {
      return this.validate() && this.calculaeResult(this.state.resultText)
    }
    let value = this.state.resultText + text
    this.setState({
      resultText: value,
      calculationText: eval(value)
    })
  }
  render() {
    let rows = []
    let num = [[9,8,7], [6,5,4], [3,2,1],[".",0,"="]]
    for(let i = 0; i < 4; i++ ){
      let cy = []
      for(let j = 0; j < 3; j++ ){
      
        cy.push(
          <TouchableOpacity key={num[i][j]} onPress ={() => this.buttonPressed(num[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{num[i][j]}</Text>
          </TouchableOpacity>

        )
      
      }
      rows.push(<View key={num[i]} style={styles.row}>{cy}</View>)
    }
    
    let opps = []
      for(let j = 0; j < 5; j++ ){
      
        opps.push(<TouchableOpacity key={this.operations[j]} onPress={() => this.operate(this.operations[j])} onLongPress={()=> this.clear(this.operations[j])} style={styles.btn}>
          <Text style={styles.btnText}>{this.operations[j]}</Text>
        </TouchableOpacity>

        )
      
      }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText} </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.number}>
           
            {rows}
          </View>
          <View style={styles.operations}>
             {opps}              
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  result: {
    flex : 3,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  }, 
  calculation: {
    flex : 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"

  },
  buttons: {
    flex: 7, 
    flexDirection : "row",
  

  },
  number: {
    flex : 3,
    backgroundColor: "#434343"
  },
  operations: {
    flex : 1, 
    backgroundColor: "black",

  }, 
  row: {
    flexDirection: "row",
    flex : 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  operations: {
    flex : 1,
    justifyContent: "space-around",
    backgroundColor: "#636363"
  },
  calculationText: {
    fontSize: 30 ,
    color: "black"
  },
  resultText: {
    fontSize: 40,
    color: "black"
  },
  btn: {
    flex: 1,
    alignItems : "center",
    alignSelf: "stretch",
    justifyContent: "center",
  
  },
  btnText: {
    fontSize: 25,
    color: "white"
  }
});
