<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import LoaderComponent from './LoaderComponent.vue'

const router = useRouter()
const task = ref('análise de sentimento')
const text = ref('')
const txa = ref(null)
const loaderBoxShown = ref(false)
const countChars = computed(() => text.value.length)

function cleanTextarea() {
  text.value = ''
}

function focusOnTextarea() {
  txa.value.focus()
}

function switchTask(nextTask) {
  focusOnTextarea()
  if (nextTask === task.value) {
    return
  }
  if (task.value === 'análise de sentimento') {
    task.value = 'sumarização'
  } else {
    task.value = 'análise de sentimento'
  }
}

function adjustTooltipsPositions() {
  const K = 0
  let tooltips = document.querySelectorAll('.tooltip')
  for (let tooltip of tooltips) {
    tooltip.addEventListener('mouseover', function () {
      let tooltiptext = this.parentNode.querySelector('.tooltiptext')
      let bounding = tooltiptext.getBoundingClientRect()
      if (bounding.x + bounding.width > window.innerWidth) {
        tooltiptext.style.left =
          bounding.x - (bounding.x + bounding.width - window.innerWidth) - K + 'px'
      }
    })
  }
}

async function processTask() {
  loaderBoxShown.value = true
  setTimeout(() => {
    if (task.value === 'análise de sentimento') {
      try {
        fetch('http://localhost:8000/sentiment-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: text.value })
        })
          .then((response) => {
            if (!response.ok) {
              window.alert(
                'Ops... o seu texto é muito grande para processarmos!\nPedimos que tente com textos de até 2500 caracteres!'
              )
              focusOnTextarea()
            } else {
              return response.json()
            }
          })
          .then((answer) => {
            loaderBoxShown.value = false
            router.push({
              name: 'Sentiment',
              params: { sentiment: JSON.stringify(answer) }
            })
          })
      } catch (err) {
        window.alert(`Ops... houve erro!\nTente novamente mais tarde!\n${err}`)
        loaderBoxShown.value = false
      }
    } else {
      try {
        fetch('http://localhost:8000/summarization', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: text.value })
        })
          .then((response) => {
            if (!response.ok) {
              window.alert(
                'Ops... o seu texto é muito grande para processarmos!\nPedimos que tente com textos de até 2500 caracteres!'
              )
              cleanTextarea()
              focusOnTextarea()
            } else {
              return response.json()
            }
          })
          .then((answer) => {
            loaderBoxShown.value = false
            router.push({
              name: 'Summarization',
              params: {
                summarization: answer
              }
            })
          })
      } catch (err) {
        window.alert(`Ops... houve erro!\nTente novamente mais tarde!\n${err}`)
        loaderBoxShown.value = false
      }
    }
  }, 1000)
}

function adjustShadowedBoxesHeight() {
  let shadowedBoxes = document.querySelectorAll('.shadowed-box')
  let body = document.body,
    html = document.documentElement
  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  for (let shadowedBox of shadowedBoxes) {
    shadowedBox.style.height = height + 100 + 'px'
  }
}

onMounted(() => {
  focusOnTextarea()
  adjustTooltipsPositions()
  adjustShadowedBoxesHeight()
})
</script>

<template>
  <div class="switch">
    <div
      class="mod"
      @click="switchTask('análise de sentimento')"
      :style="task === 'análise de sentimento' ? 'background-color: #cacaca85' : ''"
    >
      <span class="mod-title fix-h">Análise de Sentimento</span>&nbsp;<span class="tooltip"
        >&#9432;<span class="tooltiptext"
          >Para saber mais sobre o modelo de IA utilizado nesta análise de sentimento, visite
          <a
            href="https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment"
            target="_blank"
            >https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment</a
          ></span
        ></span
      >
    </div>
    <div
      class="mod"
      @click="switchTask('sumarização')"
      :style="task === 'sumarização' ? 'background-color: #cacaca85' : ''"
    >
      <span class="mod-title">Sumarização</span> &nbsp;<span class="tooltip"
        >&#9432;<span class="tooltiptext"
          >Para saber mais sobre o modelo de IA utilizado nesta sumarização, visite
          <a href="https://huggingface.co/facebook/bart-large-cnn" target="_blank"
            >https://huggingface.co/facebook/bart-large-cnn</a
          ></span
        ></span
      >&nbsp;
    </div>
  </div>
  <textarea
    @input="summarized = false"
    ref="txa"
    v-model="text"
    :placeholder="'Digite aqui a notícia para ' + task"
  >
  </textarea>
  <span v-if="countChars > 0" class="countChars">
    {{ countChars }} {{ countChars > 1 ? 'caracteres' : 'caracter' }}</span
  >
  <div class="btnBox">
    <button
      class="btn red"
      :style="countChars == 0 ? 'background-color: grey; cursor: unset;' : ''"
      :disabled="countChars == 0"
      @click="
        () => {
          cleanTextarea()
          focusOnTextarea()
          summarized = false
        }
      "
    >
      Limpar
    </button>
    <button
      class="btn green"
      @click="processTask()"
      :disabled="countChars == 0"
      :style="countChars == 0 ? 'background-color: grey; cursor: unset;' : ''"
    >
      {{ task == 'sumarização' ? 'Sumarizar' : 'Analisar' }}
    </button>
  </div>
  <div v-show="loaderBoxShown" class="loader-box">
    <LoaderComponent />
  </div>
</template>

<style scoped>
.loader-box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 9999;
}
.switch {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem;
}
.fix-h {
  line-height: 110%;
}
.mod {
  display: flex;
  flex: 1;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
  border-radius: 12px;
  cursor: pointer;
}
.mod:hover {
  background-color: #a9a9a985 !important;
}
.mod-title {
  font-size: 14pt;
  font-weight: bold;
  text-wrap: wrap;
}
textarea {
  font-family: 'Roboto', sans-serif;
  display: block;
  margin: auto;
  resize: none;
  height: 300px;
  padding: 1rem;
  white-space: pre-line;
  text-wrap: wrap;
  border-radius: 12px;
  border: 1px solid gray;
  box-shadow: 1px 1px 1px grey;
  cursor: text;
}
@media only screen and (max-device-width: 500px) {
  textarea,
  .countChars {
    width: 95%;
  }
}
@media only screen and (min-device-width: 501px) and (max-device-width: 800px) {
  textarea,
  .countChars {
    width: 90%;
  }
}
@media only screen and (min-device-width: 801px) {
  textarea,
  .countChars {
    width: 70%;
  }
}
.countChars {
  display: block;
  text-align: right;
  margin: auto;
  font-weight: bold;
}
.btnBox {
  margin-top: 1rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.btn {
  color: white;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12pt;
}
.red {
  background-color: rgb(200, 0, 0);
  transition: background-color 0.5s ease-in-out;
}
.red:hover {
  background-color: rgb(138, 2, 2);
}
.green {
  background-color: rgb(22, 205, 22);
  transition: background-color 0.5s ease-in-out;
}
.green:hover {
  background-color: #195128;
}
.tooltip .tooltiptext {
  margin-left: auto;
  margin-right: auto;
  visibility: hidden;
  background-color: white;
  width: 15rem;
  font-size: 12pt;
  text-wrap: wrap;
  overflow-wrap: break-word;
  padding: 1rem;
  text-align: justify;
  border-radius: 12px;
  position: absolute;
  z-index: 9999;
  border: 1px solid grey;
  box-shadow: 1px 1px 1px grey;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
