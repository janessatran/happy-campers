class Activity < ApplicationRecord
  has_many :park_activities
  has_many :parks, through: :park_activities
end
