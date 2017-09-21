import React, { Component } from "react"
import PropTypes from "prop-types"

import List from "../components/Sidebar/List"
import Message from "../components/Message/Message"
import MessageInput from "../components/Message/MessageInput"
import ChannelForm from "../components/Forms/ChannelForm"

import UsersAPI from "../services/UsersAPI"
import ChannelsAPI from "../services/ChannelsAPI"

export default class ChatContainer extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      channels: [],
      messages: [],
      currentChannel: null
    }
  }

  componentWillMount() {
    UsersAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({users: response.data})
      }
    })

    ChannelsAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({ channels: response.data } )
      }
    })
  }

  createChannel(params, ref1, ref2) {
    const { channels } = this.state

    ChannelsAPI.create({
      data: params,
      onSuccess: (response) => {
        this.setState({ channels: channels.concat(response.data) })
        this.toggleChannelForm(ref1, ref2)
      }
    })
  }

  createMessage(params) {
    ChannelsAPI.createMessage({
      channelId: this.state.currentChannel.id,
      data: params,
      onSuccess: (response) => {
        this.setState({
          messages: this.state.messages.concat(response.data)
        })
      }
    })
  }

  toggleChannelForm(ref1, ref2) {
    if (ref1.hasAttribute('hidden')) {
      ref1.removeAttribute('hidden')
      ref2.setAttribute('hidden', 'hidden')
    } else {
      ref2.removeAttribute('hidden')
      ref1.setAttribute('hidden', 'hidden')
    }
  }

  handleChannelClick(channelId) {
    ChannelsAPI.fetchById({
      channelId,
      onSuccess: (response) => {
        this.setState({
          currentChannel: response.data,
          messages: response.data.messages
        })
      }
    })
  }

  handleUserClick(userId) {
    alert(`Click user: ${userId}`)
  }

  renderMainContent() {
    const { currentChannel, messages } = this.state

    if (currentChannel !== null) {
      const { name, users } = currentChannel
      const usernames = users.map(user => {
        return (
          <li>{ user.username }</li>
        )
      })
      const channelMessages = messages.map(message => {
        return (
          <Message content={ message.content } />
        )
      })
      return (
        <div>
          <div className="channel-header name">
            Current Channel: { name }
          </div>
          <div className="channel-header users">
            Channel Users:
            <ul>
              { usernames }
            </ul>

            Messages:
            <ul>
              { channelMessages }
            </ul>
          </div>
          <MessageInput onCreateMessage={ (params) => { this.createMessage(params)}}/>
        </div>
      )
    }
    else {
      return (
        <div>Select a Channel</div>
      )
    }
  }

  render() {
    const { users, channels, currentChannel } = this.state
    const publicChannels = channels.filter( (member) => { return member.type === "PublicChannel" } )
    const privateChannels = channels.filter( (member) => { return member.type === "PrivateChannel" } )
    const groupChannels = channels.filter( (member) => { return member.type === "GroupChannel" } )

    let formRef, contentRef

    return (
      <div>
        <div
          ref={ (el) => { formRef = el } }
          role="channel-form"
          hidden>
          <ChannelForm
            users={ users }
            onCreateChannel={ (value) => { this.createChannel(value, formRef, contentRef) } }
            onCancelCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }/>
        </div>
        <div
          ref={ (el) => { contentRef = el } }
          role="main-content">
          <aside>
            <List
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "hashtags" }
              type={ "Public Channels" }
              items={ publicChannels }
              handleItemClick={ (channelId) => { this.handleChannelClick(channelId) } } />
            <List
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "lock" }
              type={ "Private Channels" }
              items={ privateChannels }
              handleItemClick={ (channelId) => { this.handleChannelClick(channelId) } } />
            <List
              type={ "Direct Messages" }
              icon={ "circle" }
              items={ users }
              handleItemClick={ (userId) => { this.handleUserClick(userId) } } />
          </aside>
          <article>
            { this.renderMainContent() }
          </article>
        </div>
      </div>
    )
  }
}
