import React, { PropTypes } from 'React';
import ReactOnRails from 'react-on-rails';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class PageIndexWidget extends React.Component {
	static propTypes = {
		updateName: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
	}
	handleChange(e) {
		const name = e.target.value;
		this.props.updateName(name)
	}
//	static childContextTypes = {
//	    muiTheme: React.PropTypes.object
//	}
//	getChildContext() {
//		return { muiTheme: getMuiTheme(baseTheme) }
//	}
	render() {
		let tilesData = [];
		for (let i=0; i<15; i++) {
			tilesData.push({ key: i, img: 'http://www.92pixels.com/wp-content/uploads/2012/10/Breathtaking-Photography.jpg' });
		}
		const styles = {
		 	root: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' },
			gridList: { width: 500, height: 500, overflowY: 'auto', marginBottom: 24 }, 
			fab: { position: 'fixed', bottom: '22px', right: '20px'}}
		return (
			<div style={styles.root}>
				<AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-mode" />
				<GridList cols={3} style={styles.gridList}>
					{tilesData.map((tile) => (
						<GridTile key={tile.key}>
							<img src={tile.img} />
						</GridTile>
				))
			}
				</GridList>
				<FloatingActionButton style={styles.fab}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
	
}
