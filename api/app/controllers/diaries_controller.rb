class DiariesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_diary, only: [:show, :edit, :update, :destroy]

  # GET /diaries
  def index
    @diaries = Diary.all
    render json: @diaries
  end

  # GET /diaries/1
  def show
    render json: @diaries
  end

  def weather
    render json: Diary.detect_weather(params[:lat], params[:lon])
  end

  def weather_mappings
    render json: Diary.weather_mappings
  end

  # POST /diaries
  def create
    @diary = Diary.new(diary_params)
    @diary.user = current_user

    if @diary.save
      render json: @diary, status: :created
    else
      render json: @diary.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diaries/1
  def update
    if @diary.update(diary_params)
      render json: @diary
    else
      render json: @diary.errors, status: :unprocessable_entity
    end
  end

  # DELETE /diaries/1
  def destroy
    @diary.destroy    
  end

  def top
    @diaries = Diary.all
    render json: @diaries
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_diary
      @diary = Diary.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def diary_params
      params.require(:diary).permit(:word, :weather, :temperature,:post_date, :place, :show_weather, :show_temp, :show_date, :show_location, :image)
    end
end
