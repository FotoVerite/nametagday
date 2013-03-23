require 'spec_helper'

describe RegistrationsController do

  describe "GET 'new'" do

    it "should create a new member and assign it to @member" do
      get_new
      assigns[:member].class.should == Member
    end

    it "new member should have times set to []" do
      get_new
      assigns[:member].times.should == []
    end

    it "should be a success" do
      get_new
      response.should be_success
    end

    it "should render the template new" do
      get_new
      response.should render_template(:new)
    end

    def get_new
      get :new
    end

  end

  describe "GET 'friend_registration'" do

    before(:each) do
      @member = FactoryGirl.create(:member)
      @friend = FactoryGirl.create(:friend, :member => @member)
      @friend.registration_token = "token"
      @friend.save
    end

    it "renders 404 if no friend is found from passed token" do
      get_friend_registration(:token => 'bad')
      response.response_code.should == 404
    end

    it "should create a new member and assign it to @member" do
      get_friend_registration
      assigns[:member].class.should == Member
    end

    it "new member should have times set to []" do
      get_friend_registration
      assigns[:member].times.should == []
    end

    it "new member should have email set to given email" do
      get_friend_registration
      assigns[:member].email.should == @friend.email
    end

    it "assigns original member to @leader" do
      get_friend_registration
      assigns[:leader].should == @member
    end

    it "should be a success" do
      get_friend_registration
      response.should be_success
    end

    it "should render the template friend_registration" do
      get_friend_registration
      response.should render_template(:friend_registration)
    end

    def get_friend_registration(options = {})
      get :friend_registration, {:token => @friend.registration_token}.merge(options)
    end

  end

  describe "POST 'create'" do

    context "successful" do

      it "should create a new member" do
        lambda do
          post_create
        end.should change(Member, :count).by(1)
      end

      it "should flash a notice" do
        post_create
        flash[:notice].should_not be_nil
      end

      it "sets a member_id in the session" do
        post_create
        session[:member_id].should_not be_nil
        session[:member_id].should == Member.last.id
      end

      it "calls add_to_mailing_list on the member" do
        mock_delay = double('mock_delay').as_null_object
        Member.any_instance.stub(:delay).and_return(mock_delay)
        mock_delay.should_receive(:add_to_mailing_list)
        post_create
      end

      it "should redirect_to confirmation_registration_path" do
        post_create
        response.should redirect_to(confirmation_registration_path)
      end

      context "with friends" do

        it "saves friends" do
          lambda do
            post_create
          end.should change(Friend, :count).by(1)
        end

         it "saves each friend in array" do
          lambda do
            post_create(:friends => {:emails => ["matthew@gmail.com", "example@aol.com"]})
          end.should change(Friend, :count).by(2)
        end

        it "saves no friends if none are given" do
          lambda do
            post_create(:friends => {:emails => []})
          end.should change(Friend, :count).by(0)
        end


        it "saves association with member" do
          post_create
          Friend.last.member_id.should == Member.last.id
        end

      end

      context "as friend invite" do

        before(:each) do
          @original_member = FactoryGirl.create(:member)
          @friend = FactoryGirl.create(:friend, :member => @original_member)
          @friend.registration_token = "token"
          @friend.save
        end

        it "assings original member as leader" do
          post_create(:registration_token => "token")
          assigns[:leader].should == @original_member
        end

      end

    end

    context "unsuccessful" do

      it "should render template new" do
        post_create( :member => {:first_name => nil})
        response.should render_template(:new)
      end

      it "assigns friends to @friends if friends entered" do
        post_create( :member => {:first_name => nil})
        assigns[:friends].length.should == 1
        assigns[:friends][0].class.should == Friend
      end

      it "assigns friends to @friends if friends entered" do
        post_create( :member => {:first_name => nil}, :friends => {:emails =>[]})
        assigns[:friends].length.should == 0
      end


      context "as friend invite" do

        before(:each) do
          @original_member = FactoryGirl.create(:member)
          @friend = FactoryGirl.create(:friend, :member => @original_member)
          @friend.registration_token = "token"
          @friend.save
        end

        it "render friend_registration" do
          post_create(:member => {:first_name => nil}, :registration_token => "token")
          response.should render_template(:friend_registration)
        end

      end

    end

    def post_create(options = {})
      post :create,
        {
          :member => FactoryGirl.attributes_for(:member),
          :friends => {:emails => ["matthew@gmail.com"]}
        }.merge(options)
    end

  end

  describe "GET 'confirmation'" do

    before(:each) do
      @member = FactoryGirl.create(:member)
      @friend = FactoryGirl.create(:friend, :member => @member)
      @friend.registration_token = "token"
      @friend.save
      session[:member_id] = @member.id
    end

    it "renders 404 if no session_id" do
      session[:member_id] = nil
      get_confirmation
      response.response_code.should == 404
    end


    it "finds member by session_id" do
      get_confirmation
      assigns[:member].should == @member
    end

    it "finds all of member's friends" do
      get_confirmation
      assigns[:friends].should == @member.friends
    end

    it "should be a success" do
      get_confirmation
      response.should be_success
    end

    it "should render the template confirmation" do
      get_confirmation
      response.should render_template(:confirmation)
    end

    def get_confirmation
      get :confirmation
    end

  end

end
