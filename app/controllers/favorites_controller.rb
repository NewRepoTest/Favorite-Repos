class FavoritesController < ApplicationController
  def index
  	@fav_repos = Favorite.all
  	puts @fav_repos
  end

  # POST 'github/:username'
  # API request returning list of repositories
  def github_request
  	github = Github.new
  	repos = github.repos.list user: params['username']

  	respond_to do |format|
      format.json { render json: repos }
    end
  end

  # POST 'addfovorite/'
  # Adding favorite repository to SQlite database
  def add_favorite
  	repo_exists = Favorite.exists?(full_name: params['name'])

  	if !repo_exists
	  	Favorite.create!(full_name: params['name'], url: params['url'], language: params['language'], version: params['version'])
	  end

	  respond_to do |format|
      format.json { render json: repo_exists }
    end
  end

  # DELETE 'removefavorite/'
  # Removing repository from favorites list
  def remove_favorite
  	Favorite.where(full_name: params['name']).destroy_all
  end
end
