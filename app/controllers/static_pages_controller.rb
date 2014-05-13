class StaticPagesController < ApplicationController

  layout :choose_layout

  before_filter :ensure_valid, :only => [:show]

  PAGES = ["about", "home", "contact", "event_request", "email_sent", "request_sent", "meetus", "faq", "instructions", "press", "volunteer"]

  NO_LAYOUT = []

  def show
    @page_title = current_page.titleize
    render(current_page.underscore)
  end

  def send_contact_message
    @message = ContactMessage.new(params[:contact_message])
    if @message.valid?
      PostOffice.delay.contact_message(@message)
      redirect_to static_page_path(:name => "email_sent")
    else
      render('static_pages/contact')
    end
  end

  def send_event_request
    @request = EventRequest.new(params[:event_request])
    if @request.valid?
      PostOffice.delay.event_request(@request)
      redirect_to static_page_path(:name => "request_sent")
    else
      render('static_pages/event_request')
    end
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
