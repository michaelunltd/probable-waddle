class Api::V1::MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :receiveable_type, :receiveable_id
end
