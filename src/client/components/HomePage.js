import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
	render() {
		return (
			<div>
				Home Page Here!!
				<br />
				<Link to='/login'>
					Login	
				</Link>
				<br />
				<Link to='/usermanager'>
					User Manager
				</Link>
				<br />
				<Link to='/storage'>
					StoragePage	
				</Link>
			</div>
		)
	}
}

export { HomePage }
