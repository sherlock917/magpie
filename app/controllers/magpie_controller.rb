class MagpieController < ApplicationController

  def index
    
  end

  def seek
    seeker = Seeker.where(id: params[:seeker])
    target = Seeker.where(id: params[:target])

    if seeker.count <= 0
      seeker = Seeker.new(id: params[:seeker], targets: [params[:target]])
      seeker.save
    else
      seeker.first.add_target params[:target]
    end 

    if target.count > 0
      target_targets = target.first.targets
      for target_target in target_targets
        if target_target == params[:seeker]
          render "success"
          return
        end
      end
      render "fail"
    else
      render "empty"
    end
  end

end
