Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    get :sign_in, to: 'devise/sessions#new'
    get :sign_out, to: 'devise/sessions#destroy'
    get :sign_up, to: 'devise/registrations#new'
  end
  get :diaries, to: 'diaries#index', as: :user_root
  resources :diaries do
    collection do
      get :weather_mappings
    end
  end
  root to: 'diaries#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
