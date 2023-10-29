# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_29_190247) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "park", force: :cascade do |t|
    t.string "full_name"
    t.string "park_code"
    t.text "description"
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "park_images", force: :cascade do |t|
    t.text "caption"
    t.text "credit"
    t.text "title"
    t.string "url"
    t.text "alt_text"
    t.bigint "park_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["park_id"], name: "index_park_images_on_park_id"
  end

  create_table "parks", force: :cascade do |t|
    t.string "full_name"
    t.string "park_code"
    t.text "description"
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "activities", default: [], array: true
  end

end
