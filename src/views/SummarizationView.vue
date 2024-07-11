<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  summarization: String
})

const router = useRouter()

const description = ref('')

function copyToClipboard() {
  let description = document.getElementById('description')
  var selection = window.getSelection()
  var range = document.createRange()
  range.selectNodeContents(description)
  selection.removeAllRanges()
  selection.addRange(range)
  navigator.clipboard.writeText(description.innerText)
}

onMounted(() => {
  description.value = props.summarization
})
</script>

<template>
  <div class="summarization-box">
    <div class="close-btn-box">
      <button @click="router.back()" class="close-btn">X</button>
    </div>
    <div class="title-box">
      <h1 class="title">Sumarização</h1>
    </div>
    <div class="description-box">
      <p id="description">{{ description }}</p>
    </div>
    <div class="btn-box">
      <div @click="copyToClipboard()" class="copy-box">
        <span class="copy">&#128203;</span>
        <span class="copy-txt">Copiar</span>
      </div>
      <button @click="router.back()" class="ok-btn">Ok</button>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
#description {
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  -o-user-select: text;
}
.summarization-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: auto;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.title-box {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.title {
  display: flex;
  flex: 20;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 44pt;
}
.close-btn {
  margin: 1rem;
  font-size: 14pt;
  position: absolute;
  top: 0;
  right: 0;
  background-color: grey;
  border-radius: 5px;
  color: white;
  box-shadow: 1px 1px 1px black;
  border: 1px solid grey;
  cursor: pointer;
}
.close-btn:hover {
  background-color: rgb(77, 76, 76);
}
.description-box {
  display: flex;
  flex-direction: column;
  flex: 4;
  align-items: center;
  justify-items: center;
  width: 100%;
}
.description-box p {
  text-align: justify;
  width: 80%;
  height: 100%;
  font-size: 14pt;
  background-color: rgb(247, 243, 243);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 1px 1px 1px black;
}
.description-box p::first-letter {
  margin-left: 50px;
}
.star-on {
  color: gold;
  font-size: 56pt;
  animation: growShrink 2s 1;
  transition: transform 1s ease-in-out;
}
.star-on:hover {
  transform: scale(1.5);
}
@keyframes growShrink {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(3);
  }
}
.btn-box {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.ok-btn {
  background-color: rgb(0, 0, 255);
  margin-top: 1rem;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12pt;
  width: 150px;
  font-weight: bold;
}
.ok-btn:hover {
  background-color: rgb(0, 0, 121);
}
.copy {
  font-size: 42pt;
  margin-bottom: -1.1rem;
}
.copy-box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.copy-box:hover .copy {
  font-size: 44pt;
}
.copy-txt {
  font-weight: bold;
}
</style>
