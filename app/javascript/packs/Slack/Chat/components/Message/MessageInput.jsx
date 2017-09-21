import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MessageInput extends Component {
  handleSubmit(evt) {
    evt.preventDefault()
    const { onCreateMessage } = this.props

    onCreateMessage({
      message: {
        content: this.refs.message_input.value
      }
    })
    this.refs.message_input.value = ''
  }


  render() {
    return (
      <form onSubmit={ (evt) => {this.handleSubmit(evt)} }>
        <label htmlFor="message_input">
          Message Content
        </label>
        <input
          ref='message_input'
          id="message_input"
          type="text"
          placeholder="Enter message content here"
          />
        <button type="submi">
          Send
        </button>
      </form>
    )
  }
}

export default MessageInput
