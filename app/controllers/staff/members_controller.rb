class Staff::MembersController < StaffController

  def index
    clear_stored_search_params if params.delete(:clear)
    remember_search_params(params)
    @members = Member.scoped.includes(:location)
    @members = @members.search(params[:search])
    @members = @members.paginate(:page => params[:page])
  end

  def show
    @member= Member.includes(:location).find(params[:id])
  end


  def edit
    @member = Member.find(params[:id])
    @password_idea = get_nice_password
  end

  def update
    enabled = params[:member].delete(:enabled)
    @member = Member.find(params[:id])
    @member.attributes = params[:member]
    if @member.save
      @member.enabled = enabled
      @member.save
      flash[:notice] = "The user was successfully updated."
      redirect_to staff_member_path(@member)
    else
      @password_idea = get_nice_password
      render('edit')
    end
  end

end