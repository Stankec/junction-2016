require_relative 'boot'

require 'rails/all'
require_relative '../app/data_objects/secrets'

Bundler.require(*Rails.groups)

module Junction2016
  class Application < Rails::Application
  end
end
