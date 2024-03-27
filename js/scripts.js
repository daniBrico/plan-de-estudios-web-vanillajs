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

// d.addEventListener('DOMContentLoaded', () => {
//   fetch('../data/plan-de-estudios.json')
//     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//     .then((data) => {
//       const $fragment = d.createDocumentFragment(),
//         $article = d.getElementsByTagName('article')

//       data.forEach((career) => {
//         const $titleCareer = d.getElementById('titleCareer'),
//           $careerDuration = d.getElementById('careerDuration')

//         $titleCareer.textContent = career.nombreCarrera
//         $careerDuration.textContent = `DURACIÓN: ${career.duracionCarrera} AÑOS`

//         if (career.hasOwnProperty('tituloIntermedio')) {
//           const $subCareer = d.getElementById('subCareer'),
//             $subCareerDuration = d.getElementById('subCareerDuration')

//           $subCareer.textContent = `${career.tituloIntermedio}`
//           $subCareerDuration.textContent = `DURACIÓN: ${career.duracionDelTituloIntermedio} AÑOS`
//         }

//         career.listaDeMateriasPorAnio.forEach((course) => {
//           const $h2 = d.createElement('h2'),
//             $div = d.createElement('div'),
//             $table = d.createElement('table'),
//             $thead = d.createElement('thead'),
//             $tbody = d.createElement('tbody'),
//             $trh = d.createElement('tr')

//           $h2.textContent = course.anio
//           $h2.classList.add(
//             'mb-4',
//             'text-center',
//             'text-3xl',
//             'text-firstColor',
//           )

//           $div.classList.add(
//             'relative',
//             'w-full',
//             'max-w-4xl',
//             'overflow-auto',
//             'rounded',
//             'mb-8',
//           )

//           $table.classList.add('w-full', 'max-w-4xl')
//           $thead.classList.add('bg-firstColor')
//           $trh.classList.add('text-white')

//           const columns = `
//             <th
//               class="border-b-8 border-back p-4 text-base font-bold tracking-wide"
//             >
//               Código
//             </th>
//             <th
//               class="border-b-8 border-back px-4 text-left font-bold tracking-wide"
//             >
//               Materia
//             </th>
//             <th
//               class="border-b-8 border-back p-4 text-base font-bold tracking-wide"
//             >
//               Dictado
//             </th>
//             <th
//               class="border-b-8 border-back p-4 text-base font-bold tracking-wide"
//             >
//               Correlativas
//             </th>
//             <th
//               class="min-w-32 border-b-8 border-back p-4 text-base font-bold tracking-wide"
//             >
//               Estado
//             </th>
//           `

//           $trh.innerHTML = columns
//           $thead.appendChild($trh)

//           $tbody.classList.add('text-black')

//           course.materias.forEach((materia, index) => {
//             const $trb = d.createElement('tr')

//             let tdata = ``,
//               clasess =
//                 'rounded-full px-3 py-0.5 tracking-wide text-black hover:cursor-pointer',
//               correlativas = '-'

//             if (materia.correlativas.length != 0)
//               correlativas = materia.correlativas.join(' - ')

//             $trb.classList.add(
//               `${index % 2 ? 'bg-thirdColor' : 'bg-secondColor'}`,
//               'hover:bg-hoverColor',
//             )

//             if (materia.estado === null) {
//               clasess = ''
//             }

//             if (materia.estado === 'Aprobada') {
//               clasess += ' bg-green-300'
//             }

//             if (materia.estado === 'Cursando') {
//               clasess += ' bg-blue-300'
//             }

//             if (materia.estado === 'Recursar') {
//               clasess += ' bg-orange-300'
//             }

//             if (materia.estado === 'Regular') {
//               clasess += ' bg-violet-300'
//             }

//             if (course.materias.length - 1 === index) {
//               tdata = `
//                 <td class="p-2 text-center">${materia.codigo}</td>
//                 <td class="border-l-4 border-back p-2">
//                   ${materia.nombreMateria}
//                 </td>
//                 <td class="border-l-4 border-back p-2 text-center">
//                   ${materia.dictado}
//                 </td>
//                 <td class="border-l-4 border-back p-2 text-center">${correlativas}</td>
//                 <td class="border-l-4 border-back p-2 text-center">
//                   <span
//                     class="${clasess}"
//                     >${materia.estado === null ? '-' : materia.estado}</span
//                   >
//                 </td>
//               `
//             } else {
//               tdata = `
//                 <td class="border-b-4 border-back py-2 text-center">${materia.codigo}</td>
//                 <td class="border-b-4 border-l-4 border-back p-2">
//                   ${materia.nombreMateria}
//                 </td>
//                 <td class="border-b-4 border-l-4 border-back p-2 text-center">
//                   ${materia.dictado}
//                 </td>
//                 <td class="border-b-4 border-l-4 border-back p-2 text-center">
//                   ${correlativas}
//                 </td>
//                 <td class="border-b-4 border-l-4 border-back p-2 text-center">
//                   <span
//                     class="${clasess}"
//                     >${materia.estado === null ? '-' : materia.estado}</span
//                   >
//                 </td>
//               `
//             }

//             $trb.innerHTML = tdata
//             $tbody.appendChild($trb)
//           })

//           $fragment.appendChild($h2)
//           $table.append($thead, $tbody)
//           $div.appendChild($table)
//           $fragment.appendChild($div)
//         })

//         $article[0].appendChild($fragment)
//       })
//     })
//     .catch((err) => {
//       let message = err.statusText || 'Ocurrio un error'
//       console.log(message)
//     })
// })

d.addEventListener('click', (e) => {
  if (e.target.matches('span')) {
    if (e.target.dataset.id) {
      if ($menuSelect != null) {
        quitarMenu()
      } else {
        $menuSelect = d
          .getElementById(`${e.target.dataset.id}`)
          .parentNode.querySelector('ul')

        mostrarMenu()
      }
    }
  }

  if (!e.target.matches('span') && $menuSelect != null) {
    quitarMenu()
  }
})
