class Stat
  include Mongoid::Document
  include Mongoid::Timestamps

  field :view_count, type: Integer, default: 0

  def add_view_count
    self.view_count += 1
    self.save
  end

end
