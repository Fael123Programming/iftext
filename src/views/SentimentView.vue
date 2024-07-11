<script setup>
import gsap from 'gsap'
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  sentiment: String
})

const router = useRouter()

const stars = ref(0)

const tweenedStars = reactive({
  stars: 0
})

watch(stars, (n) => {
  gsap.to(tweenedStars, { duration: 2, stars: Number(n) || 0 })
})

const score = ref(0.0)

const tweenedScore = reactive({
  score: 0
})

watch(score, (n) => {
  gsap.to(tweenedScore, { duration: 2, score: Number(n) || 0.0 })
})

onMounted(() => {
  const sentObj = JSON.parse(props.sentiment)
  stars.value = sentObj.stars
  score.value = sentObj.score
})
</script>

<template>
  <div class="sentiment-box">
    <div class="close-btn-box">
      <button @click="router.back()" class="close-btn">X</button>
    </div>
    <div class="title-box">
      <h1 class="title">Sentimento</h1>
    </div>
    <div class="terms-box">
      <span>Negativo</span>
      <span></span>
      <span></span>
      <span></span>
      <span>Positivo</span>
    </div>
    <p class="stars-p">
      <span
        v-for="i in [1, 2, 3, 4, 5]"
        :class="'star-' + (i <= tweenedStars.stars ? 'on' : 'off')"
        :key="i"
        >&#9733;</span
      >
    </p>
    <div class="score">
      <p>Pontuação de Confiança ({{ tweenedScore.score.toPrecision(4) }})</p>
      <p>{{ (tweenedScore.score * 100).toFixed(2) }} &percnt; de acurácia</p>
    </div>
    <div class="btn-box">
      <button @click="router.back()" class="ok-btn">Ok</button>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.sentiment-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: auto;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.terms-box span {
  font-size: 14pt;
  font-weight: bold;
  transform: rotate(-45deg);
}
.terms-box {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  transition: background-color 1s ease-in-out;
}
.terms-box:hover {
  background-color: rgb(247, 243, 243);
}
.title-box {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  transition: background-color 1s ease-in-out;
}
.title-box:hover {
  background-color: rgb(247, 243, 243);
}
.title {
  display: flex;
  flex: 20;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 48pt;
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
.score {
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 1s ease-in-out;
}
.score:hover {
  background-color: rgb(247, 243, 243);
}
.score p {
  font-size: 20pt;
  text-align: center;
  width: 100%;
}
.stars-p {
  display: flex;
  flex: 2;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  transition: background-color 1s ease-in-out;
}
.stars-p:hover {
  background-color: rgb(247, 243, 243);
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
.star-off {
  color: grey;
  font-size: 56pt;
  transition: transform 1s ease-in-out;
}
.star-off:hover {
  transform: scale(1.5);
}
.btn-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
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
</style>
