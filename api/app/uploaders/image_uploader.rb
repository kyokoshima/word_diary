class ImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
#"uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    # "#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    "images"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end
  version :square do
    #process resize_to_fill: [500, 500]
    process :do_modify
  end
    def do_modify
      resize_to_fill 500,500
      manipulate! do |img|
#        img = img.sepiatone
#        img = img.auto_orient
#        img = img.radial_blur(blur_factor)
#        img = img.crop_resized!(500, 500, Magick::CenterGravity)
        img.combine_options do |c|
         # c.gravity 'Center'
         # c.pointsize '22'
         # c.draw "text 0,0 'test'"
         # c.fill 'white'
          c.gravity 'Center'
          c.encoding "UTF-8"
          c.pointsize '80'
          c.font model.genshin_font_path
          c.stretch 'UltraCondensed'
          c.draw "text 0,0 '#{model.word}'"
          c.weight 'Heavy'
          c.style 'Any'
# c.stroke "#000"
          c.strokewidth 2
          c.gravity 'SouthWest'
          c.pointsize 20
          c.draw "text 50,60 '#{model.place}'" if model.show_location
          c.draw "text 90,27 '#{model.temperature}'" if model.show_temp

          c.gravity 'SouthEast'
          c.draw "text 40,27 '#{model.post_date}'" if model.show_date
          
          c.gravity 'SouthWest'
          c.font model.weather_font_path      
          c.draw "text 50,25 '#{model.weather_icon_letter}'" if model.show_weather
#    c.shadow '15, 15'
          
          c.fill("#FFFFFF")
        end
#        copyright = Magick::Draw.new
#        my_text = "\251 NPS"
#        copyright.annotate(img, 0, 0, 3, 18, my_text) do
#           self.font = 'Helvetica'
#           self.pointsize = 12
#           self.font_weight = Magick::BoldWeight
#           self.fill = 'white'
#           self.gravity = Magick::SouthEastGravity
#        end
        img
      end
    end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_whitelist
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected 
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

end
