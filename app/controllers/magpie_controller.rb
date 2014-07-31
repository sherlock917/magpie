class MagpieController < ApplicationController

  def index
    
  end

  def seek
    seeker = Seeker.where(uid: params[:seeker])
    target = Seeker.where(uid: params[:target])

    if seeker.count <= 0
      seeker = Seeker.new(uid: params[:seeker], targets: [params[:target]])
      seeker.save
    else
      seeker.first.add_target params[:target]
    end

    if target.count > 0
      target.first.add_follower params[:seeker]
      target_targets = target.first.targets
      for target_target in target_targets
        if target_target == params[:seeker]
          render json: { status: "success" }, status: 200
          return
        end
      end
      render json: { status: "fail" }, status: 200
    else
      render json: { status: "empty" }, status: 200
    end
  end

end
