class Movie < ApplicationRecord
  has_many :reviews
  has_and_belongs_to_many :collections
end
