export function init() {
  const accessToken =
    '742adcb3360f4ae797bf06755fb7f0e20e17ee900d2957118a55eb38a57a4753'
  const url = `https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`
  const is_touch_device = () => {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }

  const createElement = (element) => {
    const anchor = document.createElement('a')
    anchor.href = element.html_url
    anchor.className = 'works-item'
    anchor.target = '_blank'
    anchor.title = element.title

    const span = document.createElement('span')
    span.className = 'works-item__inner'

    const image = document.createElement('img')
    image.className = 'works-item__img photo lazy'
    image.dataset.src = element.images.hidpi
    image.src = 'img/blank.gif'

    span.appendChild(image)
    anchor.appendChild(span)

    return anchor
  }

  const addToDOM = (data) => {
    const parent = document.getElementById('js-works')
    parent.appendChild(data)

    if (lazyLoadInstance) {
      lazyLoadInstance.update()
    }
  }

  const createAllList = (data) => {
    data.forEach(function (el) {
      addToDOM(createElement(el))
    })
  }

  const createErrorMsg = () => {
    const error = document.createElement('p')
    error.className = 'works-item__error'
    error.innerHTML =
      'Oh, it looks like a connection error. <br> Don’t waste your time and use a button below.'
    return error
  }

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', //lub używając powyższej opisanego Headers()
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Oh, it looks like a connection error.')
        addToDOM(createErrorMsg())
        if (!is_touch_device()) {
          dotAnimation.init()
        }
      }
    })
    .then((res) => {
      createAllList(res.slice(0, 8))
      if (!is_touch_device()) {
        dotAnimation.init()
      }
    })
    .catch((error) => {
      addToDOM(createErrorMsg())
      if (!is_touch_device()) {
        dotAnimation.init()
      }
    })
}
