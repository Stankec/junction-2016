class LocationCampaignRait
  attr_reader :location

  def initialize(location)
    @location ||= location
  end

  def call
    tweets = nearby_tweets
    require 'pry'; binding.pry
  end

  private

  def nearby_tweets
    @nearby_tweets ||= client.search('', geocode: geocode)
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
end
