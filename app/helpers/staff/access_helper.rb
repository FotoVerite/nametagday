module Staff::AccessHelper

  def menu_link(name, path)
    link_to(name, path,
            :onmouseover => "writeText('status', 'Manage #{name}');",
            :onmouseout  => "writeText('status', '');")
  end

end
