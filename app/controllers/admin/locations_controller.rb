module Admin
  class LocationsController < ResourcefulController
    private

    def permitted_attributes
      [:name, :longitude, :latitude, :radius]
    end
  end
end
