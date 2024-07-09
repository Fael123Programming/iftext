<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import gsap from 'gsap'
import LoaderComponent from './LoaderComponent.vue'
const task = ref('análise de sentimento')
const text = ref('')
const txa = ref(null)
const loaderBoxShown = ref(false)
const countChars = computed(() => text.value.length)
const sentiment = ref({})
const value = ref(0.0)
const tweened = reactive({
  value: 0
})
watch(value, (n) => {
  gsap.to(tweened, { duration: 2, value: Number(n) || 0.0 })
})
const dialogShown = ref(false)

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
  const K = 15
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
  const data = {
    text: text.value
  }
  try {
    fetch('http://localhost:8000/sentiment-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          window.alert('Invalid response')
        } else {
          return response.json()
        }
      })
      .then((answer) => {
        sentiment.value = answer
        value.value = answer['score']
        dialogShown.value = true
      })
  } catch (err) {
    window.alert(`ERROR CAUGHT: ${err}`)
  }
  loaderBoxShown.value = false
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

function closeDialog() {
  dialogShown.value = false
  cleanTextarea()
  focusOnTextarea()
  value.value = 0.0
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
          <a
            href="https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment"
            target="_blank"
            >https://huggingface.co/facebook/bart-large-cnn</a
          ></span
        ></span
      >&nbsp;
    </div>
  </div>
  <textarea ref="txa" v-model="text" :placeholder="'Digite aqui a notícia para ' + task">
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
  <div v-show="loaderBoxShown" class="shadowed-box">
    <LoaderComponent />
  </div>
  <div v-show="dialogShown" class="shadowed-box">
    <dialog>
      <p class="score">Sentimento</p>
      <div class="terms-box">
        <div class="terms"><span>Negativo</span><span>Positivo</span></div>
      </div>
      <p>
        <span
          v-for="i in [1, 2, 3, 4, 5]"
          :class="'star-' + (i <= sentiment['stars'] ? 'on' : 'off')"
          :key="i"
          >&#9733;</span
        >
      </p>
      <p class="score-2">Pontuação de Confiança ({{ value.toPrecision(4) }})</p>
      <p class="score-2">{{ (tweened.value * 100).toFixed(2) }} &percnt; de acurácia</p>
      <button class="btn blue" @click="closeDialog()">Ok</button>
    </dialog>
  </div>
</template>

<style scoped>
.terms {
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.terms span {
  font-size: 8pt;
  font-weight: bold;
  transform: rotate(-45deg);
}
.terms-box {
  display: flex;
  flex: 1;
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.score {
  font-weight: bold;
  font-size: 22pt;
}
.score-2 {
  font-weight: bold;
  font-size: 10pt;
}
.star-on {
  color: gold;
  font-size: 28pt;
}
.star-off {
  color: grey;
  font-size: 28pt;
}
dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin: auto;
  top: 20%;
  border-radius: 12px;
  border: 1px solid grey;
  padding: 2rem;
  width: fit-content;
  height: fit-content;
}
.shadowed-box {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.471);
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
.blue {
  background-color: rgb(0, 0, 255);
}
.blue:hover {
  background-color: rgb(0, 0, 121);
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
