import API from './API'

const ChannelsAPI = {
  fetchAll({onSuccess}) {
    API({
      url: "api/v1/channels",
      method: "GET",
      onSuccess: onSuccess
    })
  },
  create({data, onSuccess}) {
    API({
      data: data,
      url: "api/v1/channels",
      method: "POST",
      onSuccess: onSuccess
    })
  },
  fetchById({onSuccess, channelId}) {
    API({
      onSuccess,
      url: `api/v1/channels/${channelId}`,
      method: "GET"
    })
  },
  createMessage({data, channelId, onSuccess}) {
    API({
      data,
      onSuccess,
      url: `api/v1/channels/${channelId}/create_message`,
      method: "POST"
    })
  }
}

export default ChannelsAPI
