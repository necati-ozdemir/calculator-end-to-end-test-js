import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import Calculator from "./calculator/Calculator";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function App() {
    require('dotenv').config();
    const classes = useStyles();
    return (
        <div className="Calculator">
            <body className="Calculator-body">
            <Calculator classes={classes}>My Calculator</Calculator>
            </body>
        </div>
    );
}

export default App;
