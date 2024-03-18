export function trackSize(selector) {
  const $tracker = $(`
  <div class="size-tracker">
    <p></p>
    <span></span>
  </div>
  `)

  const $element = $(selector)

  $tracker.find('p').text('Element: ' + selector);


  const updateSize = () => {
    const rect = $element.get(0);
    const width = Math.floor(rect.clientWidth)
    const height = Math.floor(rect.clientHeight)

    $tracker.find('span').text(`WxH: ${width} x ${height}`)
  };
  updateSize();
  const observer = new ResizeObserver(updateSize);

  observer.observe($element.get(0));

  $(document.body).append($tracker)
}