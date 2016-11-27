class CampaignSorter
  TIME_OFFSET = 10.minutes
  GRAVITY = 1.8

  attr_reader :location

  def initialize(location)
    @location = location
  end

  def call
    location
      .campaigns
      .select()
      .joins(:location_campaigns)
      .order(sort_sql)
  end

  private

  def sort_sql
    <<-SQL
      (location_campaigns.points) /
      (
        (extract(epoch from campaigns.updated_at) + #{TIME_OFFSET})^#{GRAVITY}
      ) DESC
    SQL
  end
end
