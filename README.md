dbpasSliceImage
===============

jQuery plugin to slice image into separate pieces for manipulation.

###Overview
This plugin will slice the `img` element into separate pieces.

[Demo](http://dbpas.github.io/dbpasSliceImage/)

###Install
```html
<head>
  ...
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
  <script src="javascripts/jquery.dbpas.sliceimage.js"></script>
  <script>
    $(document).ready(function() {
      $('img').dbpasSliceImage({options});
    });
  </script>
  ...
</head>
```

###Options
####Default
|Option         |Description                                                                              |Type      |Default |
|---------------|-----------------------------------------------------------------------------------------|----------|--------|
|`slices`       |Number of slices.                                                                        |`int`     |4         |
|`imageWidth`   |Width of image.                                                                          |`int`     |null    |
|`imageHeight`  |Height of image.                                                                         |`int`     |null    |
|`onComplete`   |callback function                                                                        |`function`|null    |
####Special
If you need to remove the plugin from your page, use `destroy`. You will need to use the `[data-sliced-image]` attribute to select the element due to the original `img` element being removed.
```javascript
$('[data-sliced-image]').dbpasSliceImage('destroy');
```

###Usage
####Simple
Just slice it...
```html
<head>
  ...
  <script>
    $(document).ready(function() {
      $('img').dbpasSliceImage({'slices':4});
    });
  </script>
  ...
</head>
<body>
  ...
  <img src="http://lorempixel.com/300/300/abstract" alt="image 1" width="300" height="300" />
  ...
</body>
```
####With Callback
Slice it and do something with it...
```html
<head>
  ...
  <script>
    $(document).ready(function() {
      $('img').dbpasSliceImage({'slices':4, 'onComplete': function() {
        $('[data-sliced-image="' + $(this).attr('id') + '"] span').animate({'custom': 5}, {duration: 1000, easing: 'linear',
          step: function(now, fx) {
            if (fx.pos < 0.25) {
              $(this).css({'transform': 'scale(' + (1 - fx.pos) + ')'});
            }
          }
        });
      }});
    });
  </script>
  ...
</head>
<body>
  ...
  <img src="http://lorempixel.com/300/300/animals" alt="image 1" width="300" height="300" />
  ...
</body>
```
####On Image Load
Wait till image load, then slice it...
```html
<head>
  ...
  <script>
    $(document).ready(function() {
      $('img').on('load', function() {
        $(this).dbpasSliceImage({'slices':4});
      });
    });
  </script>
  ...
</head>
<body>
  ...
  <img src="http://lorempixel.com/300/300/nature" alt="image 1" />
  ...
</body>
```
###Tips
- No image after slice, make sure the image's width and height has been declared in ANY of the following ways; the `img` tag, the plugin's options or put the plugin inside the image's `onload` event.
- Need to slice multiple images and manipulate them differently, give the `img` element an `id` or `class`.
- To select the slices in CSS or JavaScript, use the `[data-sliced-image]` attribute.
