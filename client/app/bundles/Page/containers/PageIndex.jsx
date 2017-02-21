import React, { PropTypes } from 'react';
import PageIndexWidget from '../components/PageIndexWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as pageActionCreators from '../actions/pageActionCreators';

function select(state) {
	return { $$pageStore: state.$$pageStore };
}

const PageIndex = (props) => {
	const { dispatch, $$pageStore } = props;
	const actions = bindActionCreators(pageActionCreators, dispatch);
	const { updateName } = actions;
	const name = $$pageStore.get('name');
	return (
			<PageIndexWidget {...{ updateName, name }} />
	);
};

PageIndex.propTypes = {
	dispatch: PropTypes.func.isRequired,

	$$pageStore: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default connect(select)(PageIndex);
