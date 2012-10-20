require 'sinatra'
require 'mechanize'
require 'json'

get '/10words' do
  unless defined? @@texts
    agent = Mechanize.new
    page = agent.get 'http://www.dn.se'
    paragraph_nodes = page.search('p')
    @@texts = paragraph_nodes.map{ |node| node.text.split ' ' }.flatten
    @@texts.select! { |word| word.length >= 5 }
    @@texts.sort! { |x,y| x.length <=> y.length }
  end
  @@ten_words = @@texts[0..9]
  scramble(@@ten_words).to_json
end

def scramble word_array
  word_array.map { |word| scramble_one word }
end

def scramble_one word
  temp_array = []
  word.chars.each { |c| temp_array << c }
  temp_array.shuffle.join
end

get '/guess' do
  correct = @@ten_words.include?(params[:q])
  @@texts.delete params[:q] if correct
  status 404 unless correct
end
