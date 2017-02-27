# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  Barba.Pjax.start()
  Barba.Pjax.init()
  Barba.Prefetch.init()
  Barba.Dispatcher.on 'linkClicked', (el) ->
    console.log el
  Barba.Dispatcher.on 'transitionCompleted', (st) ->
    pageInit()
  getNewPageFile = -> 
    return Barba.HistoryManager.currentStatus().url.split('/').pop();
  pageInit = ->
    $('#diary_word').on 'keyup', ->
      $('#preview-word').text $(this).val()
    readURL = (input) ->
      if input.files && input.files[0]
        reader = new FileReader()
        
        reader.onload = (e) ->
          $('#preview').attr 'src', e.target.result
# readColor $('#preview')[0]
        reader.readAsDataURL input.files[0]

    readColor = (img) ->
      RGBaster.colors(img, {
        success: (payload) ->
          console.log payload
          textColor = complementColor payload.palette[9]
          console.log textColor
          $('.preview-container').css('color', textColor)
        }
      )
    $('#diary_image').change ->
      readURL(@)
      

    Materialize.toast $('#notice').text(), 3000 if $('#notice').text()
    Materialize.toast $('#error').text(), 3000 if $('#error').text()
    Materialize.updateTextFields() if Materialize.updateTextFields
    if getNewPageFile() != 'edit'
      [lastLat, lastLon, lastTemp, lastIcon] = ''
      if navigator.geolocation and $('.preview-container')
        url = 'http://api.openweathermap.org/data/2.5/weather'
        key = '317b5b5a2c782dd1b7aab1c82867e90c'
        watchId = navigator.geolocation.watchPosition (position) ->
          lat = position.coords.latitude
          lon = position.coords.longitude
          [lastLat ,lastLon] = [lat, lon]

          $.ajax url,
            type: 'get',
            data: {
              appid: key,
              lat: lat,
              lon: lon,
              units: 'metric'
            }
          .done (response, status, xhr) ->
            place = response.name
            $('#preview-place').text place
            $('#diary_place').val place
            temp = "#{Math.round response.main.temp}℃"
            $('#preview-temp').text temp
            $('#diary_temperature').val temp
            
            weather = response.weather[0]
            icon = weather.icon
            $('#preview-weather i').addClass(weather_mappings[icon])
            $('#diary_weather').val weather.main
          .fail (xhr, status, error) ->
            console.log error
          .always (data, status, error) ->
            console.log status
        , (error) ->
          console.log error   
      post_date = moment().format("ddd, MMM do YYYY")
      $('#preview-date').text(post_date)
      $('#diary_post_date').val(post_date)
  $('.button-collapse').sideNav({
      menuWidth: 200,
      edge: 'right',
      draggable: true
      })
  pageInit()


  MovePage = Barba.BaseTransition.extend
    start: -> 
      Promise
        .all([@newContainerLoading, @scrollTop()])
        .then(@movePages.bind(@));
    ,
    scrollTop: -> 
      deferred = Barba.Utils.deferred();
      obj = { y: window.pageYOffset };

      TweenLite.to obj, 0.4, {
        y: 0,
        onUpdate: -> 
          if obj.y == 0 
            deferred.resolve();
          window.scroll(0, obj.y);
        ,
        onComplete: -> 
          deferred.resolve();
      }
      return deferred.promise;
    ,

    movePages: -> 
      _this = @;
      goingForward = true;

      if getNewPageFile() == 'diaries'
        goingForward = false
      
      $('.side-nav, .fixed-action-btn').hide();
      TweenLite.set(@newContainer, {
        visibility: 'visible',
        xPercent: if goingForward then 100 else -100,
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0
      });

      TweenLite.to @oldContainer, 0.3, { xPercent: if goingForward then -100 else 100 }
      TweenLite.to @newContainer, 0.3, { xPercent: 0, onComplete: -> 
        TweenLite.set _this.newContainer, { clearProps: 'all' }
        $('.side-nav, .fixed-action-btn').show()
        _this.done()
      }
    ,

  Barba.Pjax.getTransition = ->
    return MovePage;

complementColor = (color) ->
  [r, g, b] = color.match(/rgb\((.*)\)/)[1].split(',')
  [max, min] = [Math.max(r, Math.max(g, b)), Math.min(r, Math.min(g, b))]
  sum = max + min
  [newR, newG, newB] = [sum - r, sum-g, sum-b]
  "rgb(#{newR},#{newG},#{newB})"
