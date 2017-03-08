module ApplicationHelper
  def m_icon name, css_class: nil
		klz = ['material-icons'] << css_class
    content_tag :i, name, { class: klz }
  end

  def link_to_no_barba body, url, html_options = {}
    html_options[:class] = [html_options[:class], 'no-barba']
    link_to body, url, html_options
  end
end
