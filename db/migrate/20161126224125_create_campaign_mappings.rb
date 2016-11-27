class CreateCampaignMappings < ActiveRecord::Migration[5.0]
  def change
    create_table :campaign_mappings do |t|
      t.belongs_to :mapping, foreign_key: true
      t.belongs_to :campaign, foreign_key: true
      t.integer :points, default: 0, null: false

      t.timestamps
    end
  end
end
