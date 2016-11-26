module Admin
  class MappingsController < ResourcefulController
    private

    def permitted_attributes
      [:twitter_user_id, :tag_list, :display_name]
    end
  end
end
