require 'sinatra'

get '/' do
  html = ''
  html << '<html><body><ul>'
  Dir.foreach('public/filearea') { |file|
    html << "<li><a href=\"filearea/#{file}\">#{file}</a></li>" unless file == '.' or file == '..'
  }
  html << '</ul>'
  html << '<form action="upload" method="post">'
  html << '<input id="files-upload" type="file" multiple>'
  html << '<input type="submit">'
  html << '</form>'
  html << '</body></html>'
  html
end

post '/upload' do
  puts "========= #{params.inspect}"
end