const SliderLinkClass = 'project-slider_item'
const SliderImageClass = 'slider_image'

export function init() {
  const accessToken =
    '742adcb3360f4ae797bf06755fb7f0e20e17ee900d2957118a55eb38a57a4753'
  const url = `https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`

  const createElement = (element, index) => {
    const anchor = document.getElementsByClassName(SliderLinkClass)[index]
    console.log(anchor)
    anchor.href = element.html_url
    anchor.target = '_blank'
    anchor.title = element.title

    const image = anchor.querySelector(SliderImageClass)
    console.log(image)
    image.dataset.src = element.images.hidpi
  }

  const createAllList = (data) => {
    data.forEach(function (el, index) {
      createElement(el, index)
    })
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
      }
    })
    .then((res) => {
      createAllList(res.slice(0, 8))
    })
    .catch((error) => {
      console.log(error)
    })
}
