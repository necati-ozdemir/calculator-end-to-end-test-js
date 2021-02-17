import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOne: '',
            numberTwo: '',
            resultValue: '',
            resultStatus: ''
        };

        this.firstValueHandler = this.firstValueHandler.bind(this);
        this.secondValueHandler = this.secondValueHandler.bind(this);
    }

    addition() {
        this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_ADDITION_URL)
    }

    subtraction() {
        this.doPostRequest(process.env.REACT_APP_CALCULATOR_SERVICE_SUBTRACTION_URL)
    }

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
                    <Button id="additionButton"
                            onClick={() => {
                                this.addition()
                            }}
                            variant="contained">Addition
                    </Button>
                    <Button id="subtractionButton"
                            onClick={() => {
                                this.subtraction()
                            }}
                            variant="contained">Subtraction
                    </Button>
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