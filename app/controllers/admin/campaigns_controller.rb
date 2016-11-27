module Admin
  class CampaignsController < ResourcefulController
    private

    def permitted_attributes
      [:name, :site, :site_data, :tag_list]
    end
  end
end
