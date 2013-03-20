class RegistrationsController < ApplicationController

  def new
    @member = Member.new
  end

end
