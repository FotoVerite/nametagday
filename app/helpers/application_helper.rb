module ApplicationHelper

  def possify(string)
    string.last == 's' ? string + "'" : string + "'s"
  end
end
