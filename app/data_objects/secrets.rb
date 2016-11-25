module Secrets
  def self.fetch(*keys)
    secrets.dig(*keys)
  end

  def self.secrets
    @secrets ||= Rails.application.secrets.with_indifferent_access
  end
end
