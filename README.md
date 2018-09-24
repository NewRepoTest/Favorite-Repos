# README

A rails web app used to manage and search favorite github repositories

![alt tag](http://oi63.tinypic.com/ea2q8n.jpg)

Basic Setup 

Check to see if needed software is installed
```
ruby -v
rails -v
sqlite3 --version
```

If the version number does not show up please install the specific service. Follow this guide https://guides.rubyonrails.org/getting_started.html

1. Clone the repository
2. Install all bundle dependencies `bundle install`
3. Create you database using
```
rails db:create
rails db:migrate
```
4. Finally run the `rails server` command and open the web app on `localhost:3000`

Enjoy!!
