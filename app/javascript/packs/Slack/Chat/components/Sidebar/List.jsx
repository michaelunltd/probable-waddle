import React, { Component } from "react"
import PropTypes from "prop-types"

import Item from "./Item";

export default class List extends Component {
  renderUsers() {
    const { items, handleItemClick } = this.props
    return items.map( (item) => {
      console.log(item.users)
      return (
        <Item
          key={ item.id }
          name={ item.username || item.name }
          itemId={ item.id }
          handleOnClick={ (itemId) => handleItemClick(itemId)}/>
      )
    })
  }

  render() {
    const { type, items, onClickCreateChannel } = this.props

    return (
      <div>
        { type }
        { onClickCreateChannel === undefined ? "" :
          <button onClick={ () => { onClickCreateChannel() } } >
            Create
          </button>
        }
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}
