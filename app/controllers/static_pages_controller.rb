class StaticPagesController < ApplicationController

  layout :choose_layout

  before_filter :ensure_valid, :only => [:show]

  PAGES = ["about", "home"]

  NO_LAYOUT = []

  def show
    @page_title = current_page.titleize
    render(current_page.underscore)
  end

  protected

    def choose_layout
      NO_LAYOUT.include?(current_page) ? 'public_blank' : 'application'
    end

    def current_page
      params[:name].to_s.downcase
    end

    def ensure_valid
      valid_pages = PAGES
      unless valid_pages.include?(current_page)
        render_404
      end
    end

end
