# == Schema Information
#
# Table name: campaigns
#
#  id         :integer          not null, primary key
#  name       :string
#  site_data  :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Campaign < ApplicationRecord
  include SiteUploader[:site]
  acts_as_taggable

  has_many :location_campaigns, dependent: :destroy
  has_many :locations, through: :location_campaigns

  validates :name, presence: true
  validates :site, presence: true

  after_save :activate_site
  before_destroy :deactivate_site

  def activate_site
    SiteUnzipper.new(self).call
  end

  def deactivate_site
    SiteDeleter.new(self).call
  end
end
