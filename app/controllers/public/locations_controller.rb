module Public
  class LocationsController < PublicController
    def show
      @location = load_location
    end

    private

    def load_location
      Location.find(params[:id])
    end
  end
end
