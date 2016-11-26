class ShrineInput < SimpleForm::Inputs::Base
  def input(wrapper_options)
    merged_input_options = merge_wrapper_options(
      input_html_options, wrapper_options
    )
    raw_input_html(merged_input_options)
  end

  private

  def raw_input_html(_options)
    "#{hidden_field}#{file_field}".html_safe
  end

  def data_attribute
    "#{attribute_name}_data".to_sym
  end

  def hidden_field
    value = object.send(data_attribute)

    @builder.hidden_field(
      attribute_name,
      value: value && value.to_json
    )
  end

  def file_field
    @builder.file_field(
      attribute_name,
      input_html_options
    )
  end
end
