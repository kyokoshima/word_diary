# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

ready = ->
  Barba.Pjax.start()
  Barba.Pjax.init()
  Barba.Prefetch.init()
  Barba.Dispatcher.on 'linkClicked', (el) ->
    console.log el
  Barba.Dispatcher.on 'transitionCompleted', (st) ->
    pageInit()
    Materialize.updateTextFields() if Materialize.updateTextFields
  getNewPageFile = -> 
    return Barba.HistoryManager.currentStatus().url.split('/').pop();
  pageInit = ->
    $('.button-collapse').sideNav({
        menuWidth: 100,
        edge: 'right',
        draggable: true
        })
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
    $('#diary_show_temp').change ->
      container = $('.temp-container')
      if $(@).prop('checked') then container.show() else container.hide()
    $('#diary_show_weather').change ->
      container = $('.weather-container') 
      if $(@).prop('checked') then container.show() else container.hide()
    $('#diary_show_date').change ->
      container = $('.date-container')
      if $(@).prop('checked') then container.show() else container.hide()
    $('#diary_show_location').change ->
      container = $('.place-container')
      if $(@).prop('checked') then container.show() else container.hide()
    if getNewPageFile() == 'new'
#d = new $.Deferred
      [lastLat, lastLon, lastTemp, lastIcon] = ''
      if navigator.geolocation and $('.preview-container')
        Materialize.toast 'Getting your location...', 2000
        d = new $.Deferred
        watchId = navigator.geolocation.watchPosition (position) ->
            d.resolve(position)
          , (error) ->
            d.reject(error)
            console.log error   
            Materialize.toast "Couldn't get your location", 3000
          d.promise()
        .then (position) ->
          inner = '<div class="circle"></div>'
          Materialize.toast "Getting weather of your place...", 2000
# url = 'http://api.openweathermap.org/data/2.5/weather'
#          key = '317b5b5a2c782dd1b7aab1c82867e90c'
          lat = position.coords.latitude
          lon = position.coords.longitude
          [lastLat ,lastLon] = [lat, lon]

#          $.ajax url,
#            type: 'get',
#            data: {
#              appid: key,
#              lat: lat,
#              lon: lon,
#              units: 'metric'
#            }
          $.ajax 'weather',
            data: {lat: lat, lon: lon}, dataType: 'json'
        .then(
          (response, status, xhr) ->
            d = new $.Deferred
            place = response.place
            $('#preview-place').text place
            $('#diary_place').val place
            temp = response.temp
            $('#preview-temp').text temp
            $('#diary_temperature').val temp
            
            $('#diary_weather').val response.weather
            $('#diary_weather_icon').val response.icon
            $('#preview-weather i').addClass(response.icon_class)
            d.resolve().promise()
          , (xhr, status, error) ->
            console.log error
            new $.Deferred().reject().promise()
          )
      post_date = moment().format("ddd, MMM D, YYYY")
      $('#preview-date').text(post_date)
      $('#diary_post_date').val(post_date)
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

$(document).on 'turbolinks:load', ready
Materialize.toast $('#notice').text(), 3000 if $('#notice').text()
Materialize.toast $('#error').text(), 3000 if $('#error').text()
