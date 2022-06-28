function openNewTab() {
  window.openNew({
    target: 'test_blank',
    url: 'submitted.html',
  })
}

function openNew(option) {
  const form = document.createElement('form')
  form.target = option.target || '_blank'
  form.action = option.url
  form.method = 'GET'

  // send some additional information
  const name = document.createElement('input')
  name.setAttribute('type', 'text')
  name.setAttribute('name', 'firstName')
  name.setAttribute('value', 'Joe')
  form.appendChild(name)

  document.body.appendChild(form)
  form.submit()
  $(form).remove()
}
