Nametagday::Application.routes.draw do

  if Rails.env.development?
    mount MailPreview => 'mail_view'
  end


  root :to => 'static_pages#show', :name => "home"
  post 'site/send_contact_message' => 'static_pages#send_contact_message', :as => 'send_contact_message'
  post 'site/send_event_request' => 'static_pages#send_event_request', :as => 'send_event_request'
  get 'site/:name' => 'static_pages#show', :as => "static_page"

  resource :registration do
    get 'locations'
    collection do
      get :confirmation
      get 'friend_registration/:token' => "registrations#friend_registration", :as => "friend"
      get 'reservation_updated'
      get 'reservation_canceled'
      delete 'cancel_reservation'
      post 'reactivate_reservation'
    end
  end


  namespace :staff do

    root :to => "access#menu", :name => "menu"

    get "/login" => "access#new"
    delete "/logout" => "access#destroy"
    get "forgot-password" => "access#forgot_password", :as => 'forgot_password'
    put "send-new-password" => "access#send_new_password", :as => 'send_new_password'

    resources :members
    resources :friends
    resources :locations

    resource :exports, :only => [:show] do
      collection do
        post :export
        get :update_fields
      end
    end

    resource :access, :controller => "access", :except => [:index, :edit, :update] do
      member do
        get :get_password_idea
      end
    end

  end


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
