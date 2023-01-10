const SliderLinkClass = '.project-slider_item'
const SliderImageClass = '.slider_image'
const HowManySlides = 8

export function init() {
  const accessToken =
    '742adcb3360f4ae797bf06755fb7f0e20e17ee900d2957118a55eb38a57a4753'
  const url = `https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`
  const createElement = (anchor, data) => {
    anchor.href = data.html_url
    anchor.target = '_blank'
    anchor.title = data.title

    const image = anchor.querySelector(SliderImageClass)
    image.srcset = data.images.hidpi
  }

  const replaceImage = (el, index, data) => {
    index = index % data.length
    const elementData = data[index]
    createElement(el, elementData)
  }

  const createAllList = (data, sliderItems) => {
    const itemsHalf = Math.ceil(data.length / 2)
    const firstSliderData = data.slice(0, itemsHalf)
    const secondSliderData = data.slice(itemsHalf)
    const elementsHalf = Math.ceil(sliderItems.length / 2)
    const firstSlider = sliderItems.slice(0, elementsHalf)
    const secondSlider = sliderItems.slice(elementsHalf)
    firstSlider.forEach((el, index) => replaceImage(el, index, firstSliderData))
    secondSlider.forEach((el, index) =>
      replaceImage(el, index, secondSliderData)
    )
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
      const sliderItems = document.querySelectorAll(SliderLinkClass)
      createAllList(res.slice(0, HowManySlides), [...sliderItems])
    })
    .catch((error) => {
      console.log(error)
    })
}
