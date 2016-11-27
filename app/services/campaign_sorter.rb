class CampaignSorter
  TIME_OFFSET = 10.minutes
  GRAVITY = 1.8

  attr_reader :location

  def initialize(location)
    @location = location
  end

  def call
    Campaign
      .joins(join_location_campaigns_sql)
      .joins(join_locations_sql)
      .order(sort_sql)
  end

  private

  def join_location_campaigns_sql
    'LEFT OUTER JOIN location_campaigns ON '\
      'campaigns.id = location_campaigns.campaign_id'
  end

  def join_locations_sql
    'LEFT OUTER JOIN locations ON '\
      'locations.id = location_campaigns.location_id'
  end

  def sort_sql
    <<-SQL
      CASE locations.id WHEN #{location.id} THEN 1 ELSE 0 END DESC,
      (location_campaigns.points) /
      (
        (extract(epoch from campaigns.updated_at) + #{TIME_OFFSET})^#{GRAVITY}
      ) ASC
    SQL
  end
end
