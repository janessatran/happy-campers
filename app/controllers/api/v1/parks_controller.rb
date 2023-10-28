class Api::V1::ParksController < ApplicationController
  before_action :set_park, only: %i[show]
 
  def index
    park = Park.all.order(created_at: :desc)
    render json: park
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
