const d = document

let $menuSelect = null

const mostrarMenu = function () {
  if ($menuSelect.classList.contains('invisible')) {
    $menuSelect.classList.remove('invisible', 'opacity-0')
  }

  $menuSelect.classList.add('mostrar')
  $menuSelect.classList.remove('quitar')
}

const quitarMenu = function () {
  $menuSelect.classList.remove('mostrar')
  $menuSelect.classList.add('quitar')
  $menuSelect = null
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

        if (subject.estado !== null) {
          $allTd[4].textContent = subject.estado
        }

        if (subject.correlativas.length != 0)
          $allTd[3].textContent = subject.correlativas.join(' - ')

        if (el.materias.length - 1 === index) {
          $allTd[0].classList.remove('py-2')
          $allTd[0].classList.add('p-2')
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

d.addEventListener('DOMContentLoaded', () => {
  loadInformationCareer()
})

// d.addEventListener('click', (e) => {
//   if (e.target.matches('span')) {
//     if (e.target.dataset.id) {
//       if ($menuSelect != null) {
//         quitarMenu()
//       } else {
//         $menuSelect = d
//           .getElementById(`${e.target.dataset.id}`)
//           .parentNode.querySelector('ul')

//         mostrarMenu()
//       }
//     } else {
//       console.log(e.target.dataset.state)
//     }
//   }

//   if (!e.target.matches('span') && $menuSelect != null) {
//     quitarMenu()
//   }
// })
