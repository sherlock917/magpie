class Seeker
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id, type: String
  field :targets, type: Array, default: []

  def add_target target
    self.targets.delete target
    self.targets.push target
    self.save
  end



end
