# Summer Wave

I was asked about a wave in a sine wave formation and thought it would be fun and took it a bit further. Used windows requestAnimationFrame() and html's canvas api.

## Simple Animation

End result is a simple wave with some summer colors that can be changed along with sizing porportions documented in Canvas.js file.

![alt text](/wave.gif)

The smoothness to the waves is perceived by plotting x-axis and y-axis with Javascripts core math method Math.sin(), mixed with the a delay 
of each draw of the canvas. 

```js
    const draw = (wave) => {
        let wave_crest_height = 200
        wave.rectHeight = (wave.startHeight - wave_crest_height) + Math.sin(wave.progress) * wave_crest_height
        wave.draw()
    }
```

**Note**: The astute observer may observe the animation above isn't actually JavaScript but a video of a it working and appears to be choppy due to the fact it's a animated gif. I did this since it is currently not possible to run JavaScript from a gist.

## Installation 

To install `summer wave` for use of mesmerizing and falling asleep and never waking up!

```
clone repository
```

```
npm install
```

```
npm run client
```

open up 