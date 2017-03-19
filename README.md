# ImageResizer

Creating all the different sized images needed for responsive images is a pain in the proverbials! So I wrote this little gulp file to do all the resizing for me.

## Setup
You know the drill by now, it's a Gulp file so download & unzip it. Open a CMD/Terminal/CLI window, navigate into the imgresizer directory and type:

    npm install

or

    yarn install

## Usage
1> Put the images to be resized in **imgresizer/srcimgs**

2> In gulpfile.babel.js change the section **newimages** to what you want to be outputted. I generally have 3 breakpoints sm (small), md (medium) and lg (large) plus a bs (base) size, then a hd (high density) for retina. For setups that I use often I copy the **newimages** definition into a seperate file and store it in **imgresizer/size-incs** so that I can just copy & paste instead of typing ;).

3> Back in the CLI just type:

    gulp

and any images in **imgresizer/srcimgs** will be resized and stored in the **imgresizer/destimgs** directory.

And that's it job done and no photoshop or gimp in sight! ;)
