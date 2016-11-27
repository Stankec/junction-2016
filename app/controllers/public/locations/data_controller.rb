module Public
  module Locations
    class DataController < PublicController
      def show
        location = load_location
        render json: location_data(location)
      end

      private

      def load_location
        Location.find(params[:location_id])
      end

      def location_data(location)
        {
          tags: tags(location),
          campaigns: campaigns(location),
          next_transport: next_transport,
          forecast: forecast
        }
      end

      def tags(location)
        []
      end

      def campaigns(location)
        campaigns = CampaignSorter.new(location).call.limit(3)
        campaigns.map do |campaign|
          {
            name: campaign.name,
            url: SiteUrlbuilder.new(campaign).call,
            tags: campaign.tag_list
          }
        end
      end

      def next_transport
        (0...2).map do |index|
          {
            destination: ['Railway station', 'Airport', 'Museum'].sample,
            arrival_time: (1..10).to_a.sample
          }
        end
      end

      def forecast
        {
          time_ahead: 3,
          type: :scattered_clouds,
          temperature: 7
        }
      end
    end
  end
end
