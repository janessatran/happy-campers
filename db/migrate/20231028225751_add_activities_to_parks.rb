class AddActivitiesToParks < ActiveRecord::Migration[7.0]
  def change
    add_column :parks, :activities, :text, array: true, default: []
  end
end
