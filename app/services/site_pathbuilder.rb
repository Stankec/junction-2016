class SitePathbuilder
  attr_reader :campaign

  def initialize(campaign)
    @campaign ||= campaign
  end

  def call
    Rails.root.join('public', 'sites', campaign.id.to_s)
  end
end
