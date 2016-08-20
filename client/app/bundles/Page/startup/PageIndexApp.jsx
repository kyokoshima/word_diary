import React from 'React';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createStore from '../store/pageStore';
import PageIndex from '../containers/PageIndex';

injectTapEventPlugin();
const PageIndexApp = (props, _ralisContext) => {
	const store = createStore(props);
	const muiTheme = getMuiTheme({
		palette: {
			primary1Color: '#C4AD61',
		},
	});
	const reactComponent = (
		<MuiThemeProvider muiTheme={muiTheme}>
			<Provider store={store}>
				<PageIndex />
			</Provider>
		</MuiThemeProvider>
	);
	return reactComponent;
};

ReactOnRails.register( { PageIndexApp } );
