class AddLatestTweetIdToLocations < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :latest_tweet_id, :string
  end
end
