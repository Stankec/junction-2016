class LocationCampaign < ApplicationRecord
  belongs_to :location
  belongs_to :campaign
end
