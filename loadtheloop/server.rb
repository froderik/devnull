require 'sinatra'

get '/' do
  redirect '/index.html'
end

get '/files' do
  html = ''
  html << '<ul>'
  Dir.foreach('public/filearea') { |file|
    html << "<li><a href=\"filearea/#{file}\">#{file}</a></li>" unless file == '.' or file == '..'
  }
  html << '</ul>'
  html
end

post '/upload' do
  file_name = 'public/filearea/' + Time.new.to_i.to_s + request.env["HTTP_X_FILE_NAME"]
  file_contents = request.body.read
  
  File.open(file_name, 'w+') { |f|
    f.write(file_contents)
  }
  
end