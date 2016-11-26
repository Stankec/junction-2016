require 'shrine'
require 'shrine/storage/s3'
require 'shrine/storage/file_system'

s3_options = {
  access_key_id: Secrets.fetch(:aws, 's3', 'access_key_id'),
  secret_access_key: Secrets.fetch(:aws, 's3', 'secret_access_key'),
  region: Secrets.fetch(:aws, 's3', 'region'),
  bucket: Secrets.fetch(:aws, 's3', 'bucket')
}

storages = {
  cache: nil,
  store: nil
}

storages.keys.each do |store|
  storages[store] =
    if Secrets.fetch(:aws, 's3')
      Shrine::Storage::S3.new(prefix: store, **s3_options)
    else
      Shrine::Storage::FileSystem.new('public', prefix: "uploads/#{store}")
    end
end

Shrine.storages = storages

Shrine.plugin :activerecord
