# == Schema Information
#
# Table name: mappings
#
#  id              :integer          not null, primary key
#  twitter_user_id :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  display_name    :string           default(""), not null
#

class Mapping < ApplicationRecord
  acts_as_taggable

  validates :twitter_user_id, presence: true, uniqueness: true
end
