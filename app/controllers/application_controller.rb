class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :layout_by_resource

  def layout_by_resource
    if request.xhr?
      false
    else
      layout_file
    end
  end

  def layout_file
    'public'
  end
end
