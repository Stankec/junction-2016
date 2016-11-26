class SiteUnzipper
  attr_reader :campaign

  def initialize(campaign)
    @campaign = campaign
  end

  def call
    Zip::File.open(zip_path) do |zip_file|
      extract_files(zip_file)
    end
  end

  private

  def zip_path
    campaign.site.to_io.path
  end

  def extract_files(zip_file)
    zip_file.each do |entry|
      file_path = File.join(destination, entry.name)
      FileUtils.mkdir_p(File.dirname(file_path))
      entry.extract(file_path) { true }
    end
  end

  def destination
    @destination ||= SitePathbuilder.new(campaign).call
  end
end
