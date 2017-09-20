import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Item extends Component {
  render() {
    const { name, handleOnClick, itemId } = this.props
    return (
      <li onClick={ () => handleOnClick(itemId) }>
        { name }
      </li>
    )
  }
}
