Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    namespace :v1 do
      resources :users
      resources :messages do
        post :create_channel_message
      end
      resources :channels do
        post :create_message
      end
    end
  end
end
