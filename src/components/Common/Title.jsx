import React from 'react'
import { useTitle } from 'hooks'

const Title = ({ title }) => {
	useTitle(title)

	return <React.Fragment></React.Fragment>
}

export default Title