class MagpieController < ApplicationController

  def index
    stat = Stat.all
    if stat.count <= 0
      stat = Stat.new()
      stat.save
      stat.add_view_count
    else
      stat.first.add_view_count
    end
  end

  def seek
    isNew = false
    seeker = Seeker.where(uid: params[:seeker])
    target = Seeker.where(uid: params[:target])

    if seeker.count <= 0
      seeker = Seeker.new(uid: params[:seeker], targets: [params[:target]])
      seeker.save
      isNew = true
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
      if isNew
        render json: { status: "fail", followers: seeker.followers.count }, status: 200
      else
        render json: { status: "fail", followers: seeker.first.followers.count }, status: 200
      end
    else
      render json: { status: "empty" }, status: 200
    end
  end

  def stat
    @view_count = Stat.all.first.view_count
    @user_count = Seeker.all.count
  end

end
