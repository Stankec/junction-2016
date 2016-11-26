class LocationCampaignRait
  attr_reader :location

  def initialize(location)
    @location ||= location
  end

  def call
  end

  private

  def interests_of_nearby_users
    @interests_of_nearby_users ||= nearby_users.flat_map do |user|
      client.friend_ids(user).attrs[:ids]
    end.uniq.compact
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
end
