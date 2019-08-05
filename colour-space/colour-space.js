var btn = document.querySelector('.mouse-cursor-gradient-tracking')
var bgd = document.querySelector('.bgd')
btn.onmousemove = function(e) {
  var x = e.pageX - btn.offsetLeft
  var y = e.pageY - btn.offsetTop

  var K = (x/(window.innerWidth-15))*100
  bgd.style.setProperty('--K', K + '%')

  btn.style.setProperty('--x', x + 'px')
  btn.style.setProperty('--y', y + 'px')
}

