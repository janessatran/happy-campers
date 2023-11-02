class Api::V1::ParksController < ApplicationController
  before_action :set_park, only: %i[show]
 
  def index
    parks = Park.all.order(created_at: :desc).includes(:activities)
    respond_to do |format|
      format.json { render :json => parks.to_json(:include => [:park_images, :activities]) }
    end
  end

  def create
  end

  def show
  end

  def destroy
  end

  private

  def set_park
    @park = Park.find(params[:park_code])
  end
end
