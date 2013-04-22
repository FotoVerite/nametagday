class Staff::LocationsController < ApplicationController

  def index
    @locations = Location.paginate(:page => params[:page])
  end

  def show
    @location= Location.find(params[:id])
  end


  def edit
    @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(params[:location])
      flash[:notice] = "The location was successfully updated."
      redirect_to staff_location_path(@location)
    else
      render('edit')
    end
  end

end
