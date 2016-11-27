Rails.application.routes.draw do
  scope '', module: 'public' do
    namespace :locations do
      resource :data, only: [:show]
    end

    resources :locations, only: [:show]
  end

  namespace :admin do
    root to: 'campaigns#index', as: :root
    resources :campaigns
    resources :locations
    resources :mappings
  end
end
