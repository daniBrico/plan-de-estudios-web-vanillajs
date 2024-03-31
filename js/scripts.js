// Variables
const d = document

let $dropdownOpen = null

// Funciones
const openCloseMenu = function ($select, $caret, $menu) {
  $select.classList.toggle('shadow-shadowSelect')
  $select.classList.toggle('border-[#2a2f3b]')
  $select.classList.toggle('border-[#26489a]')

  $caret.classList.toggle('rotate-180')

  $menu.classList.toggle('opacity-0')
  $menu.classList.toggle('invisible')
}

const loadInformationCareer = async function () {
  try {
    let res = await fetch('../data/plan-de-estudios.json'),
      data = await res.json()

    const career = data[0]

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      }

    const $fragment = d.createDocumentFragment(),
      $article = d.getElementsByTagName('article')

    const $titleCareer = d.getElementById('titleCareer'),
      $careerDuration = d.getElementById('careerDuration')

    $titleCareer.textContent = career.nombreCarrera
    $careerDuration.textContent = `DURACIÓN: ${career.duracionCarrera} AÑOS`

    if (career.hasOwnProperty('tituloIntermedio')) {
      const $subCareer = d.getElementById('subCareer'),
        $subCareerDuration = d.getElementById('subCareerDuration')

      $subCareer.textContent = `${career.tituloIntermedio}`
      $subCareerDuration.textContent = `DURACIÓN: ${career.duracionDelTituloIntermedio} AÑOS`
    }

    career.listaDeMateriasPorAnio.forEach((el) => {
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

        const $allTd = $cloneTemplateTr.querySelectorAll('td')

        $allTd[0].textContent = subject.codigo
        $allTd[1].textContent = subject.nombreMateria
        $allTd[2].textContent = subject.dictado

        if (subject.correlativas.length != 0)
          $allTd[3].textContent = subject.correlativas.join(' - ')

        const $select = $allTd[4].querySelector('div > div'),
          $caret = $select.querySelector('div'),
          $menu = $allTd[4].querySelector('ul')

        $select.id = `select-${subject.codigo}`

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

        const $options = $allTd[4].querySelectorAll('ul > li'),
          $selected = $allTd[4].querySelector('span')

        $options.forEach((option) => {
          option.addEventListener('click', () => {
            $selected.innerText = option.innerText

            $options.forEach((option) => {
              option.classList.remove('bg-[#23242a]')
            })

            option.classList.add('bg-[#23242a]')

            openCloseMenu($select, $caret, $menu)
            $dropdownOpen = null
          })
        })

        if (el.materias.length - 1 === index) {
          $allTd.forEach((td) => {
            td.classList.remove('border-b-4')
          })
        }

        $cloneTemplateTableInfo
          .querySelector('tbody')
          .appendChild($cloneTemplateTr)
      })

      $fragment.appendChild($cloneTemplateTableInfo)
    })

    $article[0].appendChild($fragment)
  } catch (err) {
    let message = err.statusText || 'Ocurrió un error'
    console.log(`Error ${err.status}: ${message}`)
  }
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

d.addEventListener('DOMContentLoaded', () => {
  loadInformationCareer()
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
})
