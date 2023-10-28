class CreatePark < ActiveRecord::Migration[7.0]
  def change
    create_table :park do |t|
      t.string :full_name
      t.string :park_code
      t.text :description
      t.decimal :latitude
      t.decimal :longitude
      t.string :state
      
      t.timestamps
    end
  end
end
