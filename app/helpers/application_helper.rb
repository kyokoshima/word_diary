module ApplicationHelper
  def m_icon name, css_class: nil
		klz = ['material-icons'] << css_class
    content_tag :i, name, { class: klz }
  end
end
