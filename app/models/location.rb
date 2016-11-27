# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  name       :string
#  location   :point
#  radius     :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Location < ApplicationRecord
  attribute :location, :legacy_point

  has_many :location_campaigns, dependent: :destroy
  has_many :campaigns, through: :location_campaigns

  validates :name, presence: true
  validates :location, presence: true
  validates :radius, presence: true

  def longitude
    (location || []).first
  end

  def latitude
    (location || []).last
  end

  def longitude=(value)
    self.location ||= []
    self.location[0] = value
  end

  def latitude=(value)
    self.location ||= []
    self.location[1] = value
  end
end
