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
|`slices`       |Number of slices.                                                                        |`int`     |2       |
|`imageWidth`   |Width of image.                                                                          |`int`     |null    |
|`imageHeight`  |Height of image.                                                                         |`int`     |null    |
|`onComplete`   |callback function                                                                        |`function`|null    |
####Special
If you need to remove the plugin from your page, use `destroy`.
```javascript
$('img').dbpasSliceImage('destroy');
```

###Usage

###Tips
