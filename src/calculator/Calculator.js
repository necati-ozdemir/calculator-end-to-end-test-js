import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOne: '',
            numberTwo: '',
            resultValue: '',
            resultStatus: '',
            calculationType: ''
        };

        this.firstValueHandler = this.firstValueHandler.bind(this);
        this.secondValueHandler = this.secondValueHandler.bind(this);
    }

    calculate() {
        if (this.state.calculationType === 'ADDITION') {
            this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_ADDITION_URL)
        } else if (this.state.calculationType === 'SUBTRACTION') {
            this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_SUBTRACTION_URL)
        }
    }

    addition() {
        this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_ADDITION_URL)
    }

    subtraction() {
        this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_SUBTRACTION_URL)
    }

    handleChange = (event) => {
        this.setState({calculationType: event.target.value});
    };

    doPostRequest(calculatorServiceUrl) {
        const body = JSON.stringify({numberOne: this.state.numberOne, numberTwo: this.state.numberTwo});
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(calculatorServiceUrl, body, {headers})
            .then(response => {
                this.setState({resultValue: response.data.resultValue});
                this.setState({resultStatus: response.data.resultStatus});
            });
    }

    firstValueHandler(event) {
        this.setState({numberOne: event.target.value});
    }

    secondValueHandler(event) {
        this.setState({numberTwo: event.target.value});
    }

    render() {
        return (
            <div className="Checkout">
                <body className="Checkout-body">
                <form className={this.props.classes.root} noValidate autoComplete="off">
                    <TextField type="number"
                               value={this.state.numberOne}
                               onChange={this.firstValueHandler}
                               id="firstValue"
                               label="First Value"/>
                    <TextField type="number"
                               value={this.state.numberTwo}
                               onChange={this.secondValueHandler}
                               id="secondValue"
                               label="Second Value"/>
                </form>

                <form className={this.props.classes.root} noValidate autoComplete="off">
                    <InputLabel id="demo-simple-select-required-label">Calculation Type</InputLabel>
                    <Select
                        id="calculationSelect"
                        value={this.state.calculationType}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={"ADDITION"}>ADDITION</MenuItem>
                        <MenuItem value={"SUBTRACTION"}>SUBTRACTION</MenuItem>
                    </Select>
                    <Button id="calculationButton"
                            onClick={() => {
                                this.calculate()
                            }}
                            variant="contained">Calculate
                    </Button>

                    {/*<Button id="additionButton"*/}
                    {/*        onClick={() => {*/}
                    {/*            this.addition()*/}
                    {/*        }}*/}
                    {/*        variant="contained">Addition*/}
                    {/*</Button>*/}
                    {/*<Button id="subtractionButton"*/}
                    {/*        onClick={() => {*/}
                    {/*            this.subtraction()*/}
                    {/*        }}*/}
                    {/*        variant="contained">Subtraction*/}
                    {/*</Button>*/}
                </form>
                <form className={this.props.classes.root} noValidate autoComplete="off">
                    <TextField type="number"
                               value={this.state.resultValue}
                               id="resultValue"
                               label="Result Value"/>
                    <TextField value={this.state.resultStatus}
                               id="resultMessage"
                               label="Result Message"/>
                </form>
                </body>
            </div>
        );
    }
}