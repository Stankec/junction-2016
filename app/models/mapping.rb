class Mapping < ApplicationRecord
  acts_as_taggable

  validates :twitter_user_id, presence: true, uniqueness: true
end
