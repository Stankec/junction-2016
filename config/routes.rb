Rails.application.routes.draw do
  root to: 'public/campaigns#index'

  namespace :admin do
    root to: 'campaigns#index', as: :root
    resources :campaigns
    resources :locations
    resources :mappings
  end
end
