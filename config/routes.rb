Rails.application.routes.draw do
  root to: 'public/campaigns#index'

  namespace :admin do
    resources :campaigns
  end
end
