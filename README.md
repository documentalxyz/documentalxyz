# Documental

Documental is a publishing tool for stories based on geodata. It is a starter-kit for [Statamic](https://statamic.com) that provides an easy framework to develop scrolytelling narratives with maps using [Mapbox](https://mapbox.com). 

Check out a demo here: [https://documental.xyz](https://documental.xyz)

Check out the full documentation here (in Portuguese): [https://docs.documental.xyz](https://docs.documental.xyz)

# Installing Documental on Ubuntu 20.04

## Dependencies (PHP 8.1 and utils)

`sudo apt install software-properties-common`

`sudo add-apt-repository ppa:ondrej/php`

`sudo apt-get install php8.1-mbstring php8.1-xml php8.1-gd php8.1 unzip php8.1-curl`

`sudo update-alternatives --set php /usr/bin/php8.1`

## Installing composer

`curl -sS https://getcomposer.org/installer |php `

`sudo mv composer.phar /usr/local/bin/composer`

## Installing Statamic CLI

`composer global require statamic/cli`

`export PATH=${PATH}:~/.config/composer/vendor/bin`

## Installing our starter kit

`statamic new documental-dev documentalxyz/documentalxyz`

Select ("yes") in the following question:

`Starter kit not found on Statamic Marketplace! Install unlisted starter kit? (yes/no) [yes]`

Create an user and password to administrate the new instance.

If everything goes smoothly, you should see this message

**"[✔] Statamic has been successfully installed into the documental-dev directory."**

## Starting Documental

Go to the new directory.

`cd documental-dev`

Start the server.

`php artisan serve`

*If you are using Multipass, add `--host=[ip]` where `[ip]` is your virtual machine address (you can check it running `multipass list` on the host).*

Open the given URL in your browser and visit the directory (`/cp`) to access the control panel.
