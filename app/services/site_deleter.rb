class SiteDeleter
  attr_reader :campaign

  def initialize(campaign)
    @campaign ||= campaign
  end

  def call
    FileUtils.rm_rf(destination)
  end

  private

  def destination
    @destination ||= SitePathbuilder.new(campaign).call
  end
end
