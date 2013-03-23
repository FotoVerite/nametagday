module ApplicationHelper

  def possify(string)
    string.last == 's' ? string + "'" : string + "'s"
  end

  def error_messages_for(object)
    render(:partial => 'application/error_messages', :locals => {:object => object})
  end

  def truncate_on_space(text, *args)
    options = args.extract_options!
    options.reverse_merge!(:length => 30, :omission => "...")
    return text if text.blank? || text.size <= options[:length]

    new_text = truncate(text, :length => options[:length] + 1, :omission => "")
    while last = new_text.slice!(-1, 1)
      return new_text + options[:omission] if last == " "
    end
  end

  def status_tag(boolean, options={})
    options[:true]        ||= ''
    options[:true_class]  ||= 'status true'
    options[:false]       ||= ''
    options[:false_class] ||= 'status false'

    if boolean
      content_tag(:span, options[:true], :class => options[:true_class])
    else
      content_tag(:span, options[:false], :class => options[:false_class])
    end
  end

  # Format text for display.
  def format(text)
    sanitize(markdown(text))
  end

  def cancel_button(link)
    "<input type='button' value='Cancel' class='cancel-button' onclick=\"window.location.href='#{link}';\" />".html_safe
  end

end
