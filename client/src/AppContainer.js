import { Container } from 'unstated';

export default class AppContainer extends Container {
	state = {
		isNotHome: false,
	}

	willEditing = () => {
		this.setState({ isNotHome: true })
	}

	endEditing = () => {
		this.setState({ isNotHome: false })
	}
}