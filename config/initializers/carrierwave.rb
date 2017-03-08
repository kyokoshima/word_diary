CarrierWave.configure do | config|
  
  if Rails.env.development?
    config.fog_directory = 'worddiary-development'
  else
    config.fog_directory = 'worddiary-production'
  end

  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'AKIAJSLZTBI3LIBRT3TA',
    aws_secret_access_key: '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',
    region: 'ap-southeast-1'
  }
  Fog::Storage.new(config.fog_credentials).sync_clock

end
