module Admin
  class CampaignsController < ResourcefulController
    private

    def permitted_attributes
      [:name, :site, :site_data]
    end
  end
end
