# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$(document).on 'ready', () ->

  $('#submit').on 'click', () ->
    marco = $('#marco').val()
    polo = $('#polo').val()
    $.get '/seek/' + marco + '/' + polo, (data) ->
      if data.status == 'empty'
        alert 'empty'
      else if data.status == 'fail'
        alert 'fail'
      else if data.status == 'success'
        alert 'success'
    false