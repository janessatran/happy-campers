require 'uri'
require 'net/http'

namespace :data do
  desc "Seeds database with parks data from NPS API"
  task prepare: :environment do
    uri = URI('https://developer.nps.gov/api/v1/parks?limit=1000')
    header = {"X-Api-Key": ENV["HAPPY_CAMPERS_DATABASE_PASSWORD"]}

    response = Net::HTTP.get_response(uri, header)

    data = ActiveSupport::JSON.decode(response.body)
    parks_data = data["data"]
    parks_data.each do |park|
      record = Park.find_or_create_by(full_name: park["fullName"])
      record.park_code = park["parkCode"]
      record.description = park["description"]
      record.latitude = park["latitude"]
      record.longitude = park["longitude"]
      record.state = park["states"]
      record.save
    end
  end
end
