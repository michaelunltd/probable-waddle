class Api::V1::ChannelsController < ApiController
  def index
    @channels = Channel.all

    render json: @channels, each_serializer: Api::V1::ChannelSerializer
  end

  def create
    @channel = Channel.create(channel_params)

    if @channel.save
      render json: @channel, serializer: Api::V1::ChannelSerializer
    else
      render json: { message: @channel.errors.full_messages.to_sentence }, status: 422
    end
  end

  def show
    @channel = Channel.find(params[:id])

    if @channel
      render json: @channel, serializer: Api::V1::ChannelSerializer
    else
      render json: { message: 'Channel not found.' }, status: 404
    end
  end

  def update
    @channel = Channel.find(params[:id])

    if @channel.update_attributes(channel_params)
      render json: @channel, serializer: Api::V1::ChannelSerializer
    else
      render json: { message: @channel.errors.full_messages.to_sentence }, status: 422
    end
  end

  def create_message
    @channel = Channel.find(params[:channel_id])
    @message = @channel.messages.new(message_params)

    if @message.save
      render json: @message, serializer: Api::V1::MessageSerializer
    else
      render json: { message: @message.errors.full_messages.to_sentence }, statu: 422
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :type, user_ids: [])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
