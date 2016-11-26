class AddDisplayNameToMappings < ActiveRecord::Migration[5.0]
  def change
    add_column :mappings, :display_name, :string, default: '', null: false
  end
end
