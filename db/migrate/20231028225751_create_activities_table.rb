
class CreateActivity < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.text :description
      t.timestamps
    end
  end
end
