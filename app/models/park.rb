class Park < ApplicationRecord
  has_many :park_images
  has_many :park_activities
  has_many :activities, through: :park_activities
end
