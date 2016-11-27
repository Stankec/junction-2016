class LocationCampaignRait
  TIME_TRESHOLD = 10.minutes
  attr_reader :location

  def initialize(location)
    @location ||= location
  end

  def call
    mappings = Mapping.where(twitter_user_id: interest_ids_of_nearby_users.keys)
    location.touch
    tags = mappings.flat_map(&:tag_list)
    campaigns = Campaign.tagged_with(tags.uniq)
    tags_count = array_count(tags)

    update_location_campigns(campaigns, tags_count)
  end

  private

  def interest_ids_of_nearby_users
    @interest_ids_of_nearby_users ||= begin
      ids = nearby_users.flat_map do |user|
        client.friend_ids(user).attrs[:ids]
      end
      array_count(ids)
    end
  end

  def array_count(array)
    counts = Hash.new(0)
    array.each { |element| counts[element] += 1 }
    counts
  end

  def nearby_users
    @nearby_users ||= nearby_tweets.map(&:user).uniq.compact
  end

  def nearby_tweets
    @nearby_tweets ||= client.search(catch_all_query, geocode: geocode)
  end

  def client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key = Secrets.fetch(:twitter, :consumer_key)
      config.consumer_secret = Secrets.fetch(:twitter, :consumer_secret)
    end
  end

  def geocode
    @geocode ||=
      [location.latitude, location.longitude, "#{location.radius}km"].join(',')
  end

  def catch_all_query
    @catch_all_query ||= (('A'..'Z').to_a + ('a'..'z').to_a).join(' OR ')
  end

  def update_location_campigns(campaigns, tags_count)
    campaigns.each do |campaign|
      location_campaign = location_campaign_for(campaign)
      tags = tags_count.keys & campaign.tag_list
      points = tags.map { |tag| tags_count[tag] }.inject(&:+)

      if location_campaign.updated_at < TIME_TRESHOLD.ago
        location_campaign.update(points: points)
      else
        location_campaign.points += points
        location_campaign.save
      end
    end
  end

  def location_campaign_for(campaign)
    LocationCampaign
      .where(campaign: campaign, location: location)
      .first_or_create
  end
end
