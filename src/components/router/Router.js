import React, {Component} from 'react'

const getCurrentPath = () => {
	const path = document.location.pathname

	return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component{
	state = {
		route: getCurrentPath()
	}

	// static childContext = {
	// 	route : React.PropTypes.string,
	// 	linkHandler : React.PropTypes.func
	// }

	getChildContext() {
		return {
			route: this.state.route,
			linkHandler: this.handleLinkClick
		}
	}

	handleLinkClick = (route) => {
		this.setState({route})
		window.history.pushState(null, '', route)
	}

	render() {
		return <div> {this.props.children} </div>
	}
}