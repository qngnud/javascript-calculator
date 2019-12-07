import React from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {create, all, config} from "mathjs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/styles/withStyles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {red} from "@material-ui/core/colors";

let math = create(all, config);

//STYLE

let StyleCard = withStyles({
        root: {
            margin: '100px'
        }
    }
)(Card);

//COMPONENT

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '0',
            evaluated: false,
            last: ''
        };
        this.handleEvaluate = this.handleEvaluate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAC = this.handleAC.bind(this)
    }

    handleEvaluate() {
        this.setState({
            input: math.evaluate(this.state.input),
            evaluated: true
        })
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    handleInput(number) {
        let evaluated = this.state.evaluated;
        if (!evaluated) {
            let currentInput = this.state.input;
            let containDot = currentInput.includes('.');
            let startsWithZero = currentInput.startsWith('0');
            if (startsWithZero) {
                if (number !== '.') {
                    currentInput = '' + number
                }
            } else {
                if (!containDot && number === '.') {
                    currentInput = currentInput + '.'
                } else if (containDot && number !== '.') {
                    currentInput = currentInput + number
                } else if (!containDot && number !== '.') {
                    currentInput = currentInput + number
                }
            }
            this.setState({
                input: currentInput,
                last: number,
                evaluated: false
            })
        } else {
            this.setState({
                input: '' + number,
                evaluated: false,
                last: number
            })
        }

    }

    handleOperator(operator) {
        let evaluated = this.state.evaluated;
        if (!evaluated) {

            let last = this.state.last;
            let currentInput = this.state.input;
            let startsWithZero = currentInput.startsWith('0');
            let operators = new RegExp(/[+/*-]$/);
            let endsWithNegativeSign = currentInput.endsWith('-');
            let endsWithDot = currentInput.endsWith('.');
            if (!startsWithZero && endsWithNegativeSign && !endsWithDot) {
                currentInput = currentInput + '-'
            } else if (!startsWithZero && !operators.test(last) && !endsWithDot) {
                currentInput = currentInput + operator
            }
            this.setState({
                input: currentInput
            })
        }
    }

    handleAC() {
        this.setState({
            input: '0'
        })
    }

    handleDel() {
        let currentInput = this.state.input;
        if (currentInput.length > 1) {
            this.setState({
                input: currentInput.slice(0, -1)
            })
        } else {
            this.setState({
                input: '0'
            })
        }
    }

    render() {
        return (
            <Container maxWidth={"sm"} className={"m-5"}>
                <StyleCard>
                    <Grid  p={2} container justify={"center"} spacing={1} alignItems={"center"}>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs>
                                <TextField p={2} variant="outlined" disabled fullWidth onChange={this.handleChange}
                                           value={this.state.input}/>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"} item xs={12} spacing={1}>
                            <Grid item xs={12}>
                                <ButtonGroup variant="contained" fullWidth color="secondary">
                                    <Button onClick={() => this.handleAC()}>AC</Button>
                                    <Button onClick={() => this.handleDel()}>Del</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"} item xs={12} spacing={1}>
                            <Grid item xs={12}>
                                <ButtonGroup fullWidth>
                                    <Button onClick={() => this.handleInput(7)}>7</Button>
                                    <Button onClick={() => this.handleInput(8)}>8</Button>
                                    <Button onClick={() => this.handleInput(9)}>9</Button>
                                    <Button onClick={() => this.handleOperator('+')}>+</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"} item xs={12} spacing={1}>
                            <Grid item xs={12}>
                                <ButtonGroup fullWidth>
                                    <Button onClick={() => this.handleInput(4)}>4</Button>
                                    <Button onClick={() => this.handleInput(5)}>5</Button>
                                    <Button onClick={() => this.handleInput(6)}>6</Button>
                                    <Button onClick={() => this.handleOperator('-')}>-</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"} item xs={12} spacing={1}>
                            <Grid item xs={12} >
                                <ButtonGroup fullWidth>
                                    <Button onClick={() => this.handleInput(1)}>1</Button>
                                    <Button onClick={() => this.handleInput(2)}>2</Button>
                                    <Button onClick={() => this.handleInput(3)}>3</Button>
                                    <Button onClick={() => this.handleOperator('*')}>X</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid container justify={"center"} item xs={12} spacing={1}>
                            <Grid item xs={12}>
                                <ButtonGroup fullWidth>
                                    <Button onClick={() => this.handleInput(0)}>0</Button>
                                    <Button onClick={() => this.handleInput('.')}>.</Button>
                                    <Button color="secondary" variant="contained" onClick={this.handleEvaluate}>=</Button>
                                    <Button onClick={() => this.handleOperator('/')}>/</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </StyleCard>
            </Container>
        )
    }
}


function App() {
    return (
        <Calculator/>
    );
}

export default App;
