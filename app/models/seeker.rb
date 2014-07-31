class Seeker
  include Mongoid::Document
  include Mongoid::Timestamps

  field :uid, type: String
  field :targets, type: Array, default: []
  field :followers, type: Array, default: []

  def add_target target
    self.targets.delete target
    self.targets.push target
    self.save
  end

  def add_follower follower
    self.followers.delete follower
    self.followers.push follower
    self.save
  end

end
