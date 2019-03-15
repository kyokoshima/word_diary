import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Avatar, Button, FormControl, FormControlLabel, Checkbox, Input, InputLabel, Paper, Typography } from '@material-ui/core';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 32)]: {
      width: 400,
      marginLeft: 'auto',
      mrginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

class LoginPage extends React.Component {
  
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
      return (
      <main>
        <Paper>
          <Avatar>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form>
            <FormControl margin="normal" required fullwidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" auroFocus />
            </FormControl>
            <FormControl margin="normal" required fullwidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
              type="submit" fullwidth variant="contained" color="primary" >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
      );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 