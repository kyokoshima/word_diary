import {createMuiTheme} from 'material-ui/styles';
import {teal} from 'material-ui/colors';
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#549788',
            contrastText: "#fff"
        },
        text: {
            primary: '#FFFFFF'
        },
        background: {
            default: '#E0CF98'
        },
        typogrpahy: {
            body1: {
                color: '#FFFFFF'
            }
        }
    }
});
