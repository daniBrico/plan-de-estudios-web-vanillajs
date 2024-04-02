// Variables
const d = document

let $dropdownOpen = null,
  career = null

// Funciones
const openCloseMenu = function ($select, $caret, $menu) {
  $select.classList.toggle('shadow-shadowSelect')
  $select.classList.toggle('border-[#2a2f3b]')
  $select.classList.toggle('border-[#26489a]')

  $caret.classList.toggle('rotate-180')

  $menu.classList.toggle('opacity-0')
  $menu.classList.toggle('invisible')
}

const getDataCareer = async function (careerName) {
  try {
    let res = await fetch('../data/plan-de-estudios.json'),
      listOfCareers = await res.json()

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      }

    let careerSearch = null

    listOfCareers.forEach((career) => {
      if (career.nombreCarrera === careerName) {
        careerSearch = career
      }
    })

    return careerSearch
  } catch (err) {
    let message = err.statusText || 'Ocurrió un error'
    console.log(`Error ${err.status}: ${message}`)
  }
}

const loadInformationTableDesing = async function () {
  // const career = await getDataCareer('Licenciatura en Informática')

  const $fragment = d.createDocumentFragment(),
    $article = d.getElementsByTagName('article')

  const $titleCareer = d.getElementById('titleCareer'),
    $careerDuration = d.getElementById('careerDuration')

  // Esto se tiene que cargar una sola vez. Tanto para desktop como para mobile. Revisar.
  $titleCareer.textContent = career.nombreCarrera
  $careerDuration.textContent = `DURACIÓN: ${career.duracionCarrera} AÑOS`

  if (career.hasOwnProperty('tituloIntermedio')) {
    const $subCareer = d.getElementById('subCareer'),
      $subCareerDuration = d.getElementById('subCareerDuration')

    $subCareer.textContent = `${career.tituloIntermedio}`
    $subCareerDuration.textContent = `DURACIÓN: ${career.duracionDelTituloIntermedio} AÑOS`
  }

  career.listaDeMateriasPorAnio.forEach((el, i) => {
    const $templateTableInfo = d.getElementById('template-table'),
      $cloneTemplateTableInfo = $templateTableInfo.cloneNode(true).content

    $cloneTemplateTableInfo.querySelector('th').textContent +=
      ` (${el.materias.length})`

    $cloneTemplateTableInfo.querySelector('h2').textContent = el.anio

    el.materias.forEach((subject, index) => {
      const $templateTr = d.getElementById('tr-template'),
        $cloneTemplateTr = $templateTr.cloneNode(true).content

      $cloneTemplateTr
        .querySelector('tr')
        .classList.add(`${index % 2 ? 'bg-thirdColor' : 'bg-secondColor'}`)

      $cloneTemplateTr.querySelector('tr').setAttribute('data-state', '')
      $cloneTemplateTr.querySelector('tr').classList.add(`group${i}${index}`)

      const $allTd = $cloneTemplateTr.querySelectorAll('td')

      $allTd[0].textContent = subject.codigo
      $allTd[1].textContent = subject.nombre
      $allTd[2].textContent = subject.dictado
      $allTd[4].appendChild(generateDropdown())

      if (subject.correlativas.length != 0)
        $allTd[3].textContent = subject.correlativas.join(' - ')

      if (el.materias.length - 1 === index) {
        $allTd[0].classList.add('rounded-bl-lg')
        $allTd[4].classList.add('rounded-br-lg')

        $allTd.forEach((td) => {
          td.classList.remove('border-b-2')
        })
      }

      $cloneTemplateTableInfo
        .querySelector('tbody')
        .appendChild($cloneTemplateTr)
    })

    $fragment.appendChild($cloneTemplateTableInfo)
  })

  $article[0].appendChild($fragment)
}

const loadInformationSmallDesign = async function () {
  const $fragment = d.createDocumentFragment(),
    $article = d.getElementsByTagName('article')[0]

  career.listaDeMateriasPorAnio.forEach((el, i) => {
    const $templateDesignSmall = d.getElementById(
        'design-small-template',
      ).content,
      $cloneYearCareerTitle = $templateDesignSmall
        .querySelector('h2')
        .cloneNode(true)

    $cloneYearCareerTitle.textContent = `${el.anio} (${el.materias.length})`

    $fragment.appendChild($cloneYearCareerTitle)

    const $cloneSubjectInformationContainer = $templateDesignSmall
      .querySelector('div')
      .cloneNode()

    el.materias.forEach((subject, j) => {
      const $cloneSubjectInfomation = $templateDesignSmall
          .querySelector('div > div')
          .cloneNode(true),
        $nombreCodigoCorrelativas = $cloneSubjectInfomation
          .querySelector('div')
          .querySelectorAll('p'),
        $dictado = $cloneSubjectInfomation.children[1].querySelector('p')

      $cloneSubjectInfomation.classList.add(`group${i}${j}`)
      $cloneSubjectInfomation.setAttribute('data-state', '')
      $cloneSubjectInfomation.children[1].appendChild(generateDropdown())

      $nombreCodigoCorrelativas[0].textContent = subject.nombre
      $nombreCodigoCorrelativas[1].textContent = subject.codigo
      $nombreCodigoCorrelativas[2].textContent =
        subject.correlativas.join(' - ')

      $dictado.textContent = subject.dictado

      $cloneSubjectInformationContainer.appendChild($cloneSubjectInfomation)
    })

    $fragment.appendChild($cloneSubjectInformationContainer)

    $article.appendChild($fragment)
  })
}

const getStateOfSubjects = async function () {
  try {
    let res = await fetch('../data/plan-de-estudios.json'),
      data = await res.json()

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      }

    return data[0].listaDeMateriasPorAnio
  } catch (err) {
    let message = err.statusText || 'Ocurrió un error'
    console.log(`Error ${err.status}: ${message}`)
  }
}

const loadInformationLocal = async function () {
  career = await getDataCareer('Licenciatura en Informática')
}

const updateBotton = function ($el, stateValue) {
  const $selected = $el.querySelector('span'),
    $allOptions = $el.querySelectorAll('li')

  $selected.textContent = stateValue
  $selected.dataset.option = stateValue

  $allOptions.forEach((option) => {
    option.classList.remove('bg-[#23242a]')
  })

  $allOptions.forEach((op) => {
    if (op.dataset.option === stateValue) op.classList.add('bg-[#23242a]')
  })
}

const generateDropdown = function () {
  const $templateDropdown = d.getElementById('dropdown-template').content,
    $cloneTemplateDropdown = $templateDropdown.cloneNode(true)

  const $select = $cloneTemplateDropdown.querySelector('div > div'),
    $caret = $select.querySelector('div'),
    $menu = $cloneTemplateDropdown.querySelector('ul')

  $select.addEventListener('click', () => {
    if ($dropdownOpen !== null) {
      if ($select === $dropdownOpen.$select) {
        openCloseMenu($select, $caret, $menu)
        $dropdownOpen = null
        return
      }
      openCloseMenu(
        $dropdownOpen.$select,
        $dropdownOpen.$caret,
        $dropdownOpen.$menu,
      )
    }
    $dropdownOpen = {
      $select,
      $caret,
      $menu,
    }
    openCloseMenu($select, $caret, $menu)
  })

  const $options = $cloneTemplateDropdown.querySelectorAll('ul > li'),
    $selected = $cloneTemplateDropdown.querySelector('span')

  $options.forEach((option) => {
    option.addEventListener('click', (e) => {
      $selected.innerText = option.innerText
      $selected.dataset.option = option.dataset.option

      $options.forEach((op) => {
        op.classList.remove('bg-[#23242a]')
      })

      option.classList.add('bg-[#23242a]')
      openCloseMenu($select, $caret, $menu)
      $dropdownOpen = null

      let currentElement = e.target

      while (currentElement !== document.body) {
        if (currentElement.hasAttribute('data-state')) {
          currentElement.dataset.state = $selected.dataset.option

          let classId =
            currentElement.classList[currentElement.classList.length - 1]

          updateBotton(
            currentElement.tagName === 'DIV'
              ? d.getElementsByClassName(classId)[0]
              : d.getElementsByClassName(classId)[1],
            currentElement.dataset.state,
          )

          break
        }

        currentElement = currentElement.parentNode
      }
    })
  })

  return $cloneTemplateDropdown
}

d.addEventListener('DOMContentLoaded', async () => {
  await loadInformationLocal()
  loadInformationTableDesing()
  loadInformationSmallDesign()
})

d.addEventListener('click', (e) => {
  if (!e.target.hasAttribute('data-drop-menu')) {
    if ($dropdownOpen !== null) {
      openCloseMenu(
        $dropdownOpen.$select,
        $dropdownOpen.$caret,
        $dropdownOpen.$menu,
      )
      $dropdownOpen = null
    }
  }

  if (e.target.hasAttribute('data-option')) {
    const $selected = e.target.parentNode.parentNode.querySelector('span')

    $selected.dataset.option = e.target.getAttribute('data-option')
    $selected.textContent = e.target.getAttribute('data-option')
  }
})
