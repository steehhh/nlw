const formatador = (data) => {
  
  return{
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm'),
  }
}

formatador(new Date ('2024-04-01'))

const atividade = {
  nome: 'almoço',
  data: new Date ("2024-07-08 10:00"),
  finalizada: true
}

let atividades = [
  atividade,
  {
    nome: 'academia em grupo', 
    data: new Date ("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'gaming session', 
    data: new Date ("2024-07-09 16:00"),
    finalizada: true
  },
]

const criaritemdeatividade = (atividade) => {

  let input = `
  <input 
  onchange= "concluirAtividade(event)"
  value="${atividade.data}"
  type="checkbox"
  `

 if(atividade.finalizada) {
  input = input + 'checked'
 }

input = input + '>'

const formatar = formatador(atividade.data)

 return `
 <div> 
 ${input}
 <span>${atividade.nome}</span>
 <time>
 ${formatar.dia.semana.longo},
  dia ${formatar.dia.numerico}
  de ${formatar.mes}
  ás ${formatar.hora}h</time>
 </div>
 `
}

const atualizarlistadeatividades = () => {
  const section = document.querySelector ('section')
  section.innerHTML = ''

if (atividades.length == 0){
  section.innerHTML = '<p>nenhuma atividade cadastrada.</p>'
 return
}

for (let atividade of atividades) {
  section.innerHTML += criaritemdeatividade (atividade)
}
}
atualizarlistadeatividades ()


const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData (event.target)

const nome = dadosDoFormulario.get ('atividade')
const dia = dadosDoFormulario.get ('dia')
const hora = dadosDoFormulario.get ('hora')
const data = `${dia} ${hora}`

const novaAtividade = {
  nome,
  data,
  finalizada: false
}

const atividadeExiste = atividades.find((atividade) => {
  return atividade.data == novaAtividade.data 
})

if(atividadeExiste) { 
  return alert('dia/hora nao disponivel')
}

atividades = [novaAtividade,...atividades]
atualizarlistadeatividades()
}

const criarDiasSeleção = () => {
  const dias = [
    "2024-02-28",
     "2024-02-29",
      "2024-03-01",
       "2024-03-02",
        "2024-03-03",
  ]

let diasSelecao = ''

for(let dia of dias) {
  const formatar = formatador (dia)
  const diaFormatado = `
  ${formatar.dia.numerico} de
  ${formatar.mes}
    `
  diasSelecao += `
    <option value ="${dia}">${diaFormatado}</option>
  `

}

document
.querySelector('select[name = "dia"]')
.innerHTML = diasSelecao
}
criarDiasSeleção()

const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for(let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    
  }


  document
  .querySelector('select[name="hora"]')
  .innerHTML = horasDisponiveis
}
criarHorasSelecao ()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

const atividade = atividades.find((atividade)=> { 
  return atividade. data == dataDesteInput
})

if(!atividade){
  return
}

atividade.finalizada = !atividade.finalizada


}