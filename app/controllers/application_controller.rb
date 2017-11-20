class ApplicationController < ActionController::Base
  layout :layout_by_resource
  include DeviseTokenAuth::Concerns::SetUserByToken

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  private
  def layout_by_resource
    'application'
  end
end
