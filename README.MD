## CARD-BACKEND

### REQUIREMENT

#### Pre-install for `node-canvas`

You can quickly install the dependencies by using the command for your OS:

OS | Command
----- | -----
OS X | `brew install pkg-config cairo libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on our wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)


#### install node module

    npm install

### DEPLOY ON PRODUCTION

    ENV=PRODUCTION ./bin/www
    
### DEPLOY ON DEVELOPMENT

    ./bin/www
    
### 静态文件目录`public`


七牛指向这个就行了