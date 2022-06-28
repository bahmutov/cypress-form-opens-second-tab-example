function openNewTab() {
  window.openNew({
    target: 'test_blank',
    url: 'submitted.html',
  })
}

function openNew(option) {
  console.log('openNew')
  // const form = document.createElement('form')
  // form.target = option.target || '_blank'
  // form.action = option.url
  // form.method = 'GET'

  // document.body.appendChild(form)
  // form.submit()
  // $(form).remove()
}
