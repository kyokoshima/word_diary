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
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
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
          c.stroke "#333333"
          c.strokewidth 0.3
          c.gravity 'SouthWest'
          c.pointsize 20
          c.draw "text 30,50 '#{model.place}'"

          c.gravity 'SouthEast'
          c.draw "text 30,30 '#{model.post_date}'"

          
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

end
