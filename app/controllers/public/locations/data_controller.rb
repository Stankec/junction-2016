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
          campaigns: campaigns(location)
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
    end
  end
end
