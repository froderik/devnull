require 'sinatra'

get '/' do
  html = ''
  html << '<html><body><ul>'
  Dir.foreach('public/filearea') { |file|
    html << "<li><a href=\"filearea/#{file}\">#{file}</a></li>" unless file == '.' or file == '..'
  }
  html << '</ul>'
  html << '<input id="files-upload" type="file" multiple />'
  html << '<button id="uploadButton">Upload files</button>'
  html << ' <script src="jquery/jquery-1.8.2.js"></script>'
  html << '<script src="js/script.js"></script>'
  html << '</body></html>'
  html
end

post '/upload' do
  puts "=== Got file: #{params[:file]}"
  puts request.body.read
end