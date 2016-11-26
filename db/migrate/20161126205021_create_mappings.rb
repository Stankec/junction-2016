class CreateMappings < ActiveRecord::Migration[5.0]
  def change
    create_table :mappings do |t|
      t.string :twitter_user_id

      t.timestamps
    end
  end
end
