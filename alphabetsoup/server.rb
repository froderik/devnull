require 'sinatra'
require 'mechanize'
require 'json'

get '/10words' do
    agent = Mechanize.new
    page = agent.get 'http://www.dn.se'
    paragraph_nodes = page.search('p')
    texts = paragraph_nodes.map{ |node| node.text.split ' ' }.flatten
    texts.sort! { |x,y| y.length <=> x.length }
    @@ten_words = texts[0..9]
    @@ten_words.to_json
end

post '/guess' do

end
