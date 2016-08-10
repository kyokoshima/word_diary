Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  get 'react_examples/component', to: 'react_examples#component', as: :component
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
