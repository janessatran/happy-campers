class CreateParkActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :park_activities, :id => false do |t|
      t.integer :activity_id
      t.integer :park_id
      t.timestamps
    end
  end
end
