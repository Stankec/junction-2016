class RaitUpdater
  def call
    Location.all.each do |location|
      LocationCampaignRait.new(location).call
    end
  end
end
