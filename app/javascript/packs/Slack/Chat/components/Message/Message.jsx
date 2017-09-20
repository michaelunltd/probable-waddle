import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Message extends Component {
  render() {
    const { content } = this.props

    return (
      <li>Message: { content }</li>
    )
  }
}
