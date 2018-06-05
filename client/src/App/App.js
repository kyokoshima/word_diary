import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import Reboot  from 'material-ui/CssBaseline';
import { AppBar, Toolbar } from 'material-ui';
import Typography from 'material-ui/Typography';
import { DiaryPage } from '../DiaryPage/DiaryPage';
import { Menu } from '../Menu';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        
        const { alert } = this.props;

        return (
            <div className="jumbotron">
                <Reboot/>
                <AppBar style={{left:240}}>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                        Word Diary
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Menu/>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div style ={{ marginTop: 32, padding: 32 }}>
                                <PrivateRoute exact path="/" component={DiaryPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 