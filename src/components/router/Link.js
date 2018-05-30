import React, {Component} from 'react'

export class Link extends Component{
	
	handleClick = (e) => {
		e.preventDefault();
		window.history.pushState(null, '', this.props.to)
		// this.context.linkHandler(this.props.to)
	}

	render(){
		const activeClass = this.context.route === this.props.to ? 'active' : ''
		return <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
	}
}