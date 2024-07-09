<script setup>
defineProps(['title', 'body', 'titleLink'])
</script>

<template>
  <div class="text-box">
    <a :href="titleLink" target="_blank">
      <h1>&#8226;&nbsp;{{ title }}</h1></a
    >
    <p>
      {{ body }}
    </p>
  </div>
</template>

<style scoped>
.text-box {
  margin: auto;
  padding: 1rem;
}
a {
  color: black;
  text-decoration: none;
}
@media only screen and (max-device-width: 500px) {
  .text-box {
    width: 95%;
  }
}
@media only screen and (min-device-width: 501px) and (max-device-width: 800px) {
  .text-box {
    width: 90%;
  }
}
@media only screen and (min-device-width: 801px) {
  .text-box {
    width: 70%;
  }
}
p {
  text-align: justify;
  font-size: 12pt;
}
p::first-letter {
  margin-left: 2rem;
}
h1 {
  line-height: 110%;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease-in-out;
  padding: 1rem;
  border-radius: 12px;
  font-weight: bold;
}
h1:hover {
  background-color: #cacaca85;
}
</style>
