import React from 'react'
import './calculator.css'

import Button from '../components/button'
import Display from '../components/display'

/* Estado inicial */
const initState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0 
}


export default class Calculator extends React.Component
{
    //clone do objeto initState . Por ser um array multiplo utilizados spreed (...)
    state = { ...initState }
    /*Resolvendo o problema do this com bind*/
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory(){
        this.setState({ ...initState })
    }
    setOperation(operation){
        //indice do array 0 (numeros)
        if (this.state.current === 0){
            /*
            Enviando para o estado inicial, caso os valores digitados:
            a operação, o indice 1 para o array guardar a operação e limpar o display
            */
            this.setState({ operation, current: 1, clearDisplay:true })
        }else{
            //quando for pressionado =, pegamos a operação anterior
            const equals = operation === '='
            //primeiro setamos a operação
            const currentOperation = this.state.operation

            //geramos o clone
            const values = [...this.state.values]
            //inserimos uma template string para executarmos a operação sobre os dois valores capturados
            //e aramezara no values [0] e o valor[1] será zerado
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                values[1] = this.state.values[0]
            }
            //setando o estado atual das variaveis que irão mudar
            this.setState({
                displayValue: values[0],//o display mostrará o valor da operação
                operation: equals ? null : operation,//se equalsfor pressionado receberá nulo caso não recebe a operação
                current: equals ? 0 : 1, //se pressionado ele passa a ser indice 0 se não permanece no segundo elemento
                clearDisplay: !equals,//o display recebe o valor falso caso equals n ser pressionado. EM values mostra vaores
                values  
            })
        }

    }
    addDigit(digit){
        //Não adicionando mais que apenas um ponto "."
        //Se o valor digitado for um ponto e no display já estiver icluido um ponto apenas retorne
        if (digit === "." && this.state.displayValue.includes('.'))
            return
        
        //limpar o display em duas situações: quando for igual a 0 para novo digito e mais zeros à esquerda
        //ou quando a variavel clearDisplay for true
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        //se o display é true o valr corrent é vazio ou obtem o valor digitado
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //variavel + valor digitado - concatenando os valores
        const displayValue = currentValue + digit
        //setando a variável inicial de estado com o novo estado
        //uma vez digitado o valor a flag cleardisplay é false
        this.setState({displayValue, clearDisplay: false})

        //de [0-9]
        if( digit !== "."){
            const i = this.state.current;//o array possui 2 elementos. 0 será para numeros de 0-9
            const newValue = parseFloat(displayValue);//converte valor digitado para float
            //clonando array value
            const values = [...this.state.values]
            values[i] = newValue
            //atribuir novo valor ao estado
            this.setState({ values })
            console.log(values)
        }
    }

    render() 
    {      
        return( 
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC"click={this.clearMemory} treecolumn/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} twocolumn/>
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        );
    }
}