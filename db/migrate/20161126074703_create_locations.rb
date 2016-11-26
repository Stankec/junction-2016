class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.point :location
      t.float :radius

      t.timestamps
    end
  end
end
