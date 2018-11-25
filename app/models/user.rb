class User < ApplicationRecord
  has_secure_password   # makes 'password' field MANDATOR
  validates :email, presence: true, uniqueness: true
  has_many :reviews
  before_save { self.email = email.downcase }

  has_many :collections

end
