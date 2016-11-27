class RenameCampaignMappingsToLocationCampaigns < ActiveRecord::Migration[5.0]
  def change
    rename_table :campaign_mappings, :location_campaigns
    rename_column :location_campaigns, :mapping_id, :location_id
  end
end
