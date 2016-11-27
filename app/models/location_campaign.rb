# == Schema Information
#
# Table name: location_campaigns
#
#  id          :integer          not null, primary key
#  location_id :integer
#  campaign_id :integer
#  points      :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class LocationCampaign < ApplicationRecord
  belongs_to :location
  belongs_to :campaign
end
