class SiteUrlbuilder
  attr_reader :campaign

  def initialize(campaign)
    @campaign ||= campaign
  end

  def call
    "/sites/#{campaign.id.to_s}/#{folder}/index.html"
  end

  private

  def folder
    file = campaign.site.original_filename
    File.basename(file, File.extname(file))
  end
end
