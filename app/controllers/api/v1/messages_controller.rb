class Api::V1::MessagesController < ApiController

  def index
  end

  def create
    @message = Message.new(message_params)

    if @message.save
      render json: @message, serializer: Api::V1::MessageSerializer
    else
      render json: { message: @message.errors.full_messages.to_sentence }, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

end
