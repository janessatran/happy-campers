class CreateParkImages < ActiveRecord::Migration[7.0]
  def change
    create_table :park_images do |t|
      t.text :caption
      t.text :credit
      t.text :title
      t.string :url
      t.text :alt_text
      t.references :park, index: true

      t.timestamps
    end
  end
end
