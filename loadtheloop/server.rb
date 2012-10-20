require 'sinatra'

get '/' do
  html = ''
  html << '<html><body><ul>'
  Dir.foreach('public/filearea') { |file|
    html << "<li><a href=\"filearea/#{file}\">#{file}</a></li>" unless file == '.' or file == '..'
  }
  html << '</ul>'

  html << '</body></html>'
  html
end