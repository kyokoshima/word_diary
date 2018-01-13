json.extract! diary, :id, :word, :weather, :temperature, :created_at, :updated_at
json.url diary_url(diary, format: :json)