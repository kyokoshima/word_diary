Rails.application.routes.draw do
  resources :diaries do
    collection do
      get :weather_mappings
    end
  end
  root to: 'diaries#top'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
