<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import ModeSwitchComponent from './components/ModeSwitchComponent.vue'
import WhatIs from './components/WhatIs.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <ModeSwitchComponent />
  <WhatIs
    title="O que é análise de sentimento?"
    body="Análise de sentimento é a interpretação automatizada de emoções expressas em textos. Para
      jornalistas, essa ferramenta é crucial para avaliar o impacto emocional de seus próprios
      textos. Utilizando técnicas de processamento de linguagem natural (NLP) e aprendizado de
      máquina, a análise de sentimento identifica o tom (positivo, negativo ou neutro) do conteúdo.
      Isso permite que jornalistas entendam como suas palavras podem ser percebidas pelo público,
      ajudando-os a ajustar o tom e a abordagem de suas reportagens. Com essa percepção, os
      jornalistas podem produzir textos mais equilibrados, impactantes e alinhados com os
      sentimentos da audiência, aprimorando a qualidade da comunicação."
    title-link="https://en.wikipedia.org/wiki/Sentiment_analysis"
  />
  <WhatIs
    title="Para que serve a sumarização automática?"
    body="A sumarização automática condensa textos longos em versões curtas, preservando informações essenciais. Para jornalistas, essa técnica é crucial para criar descrições de notícias precisas e coerentes a partir do próprio corpo das matérias. Ela aumenta a eficiência ao reduzir o tempo de criação manual, garante consistência na qualidade dos resumos, e assegura precisão ao destacar pontos relevantes. Além disso, adapta-se a diferentes formatos de notícias e facilita o acesso rápido às informações principais, beneficiando tanto os jornalistas quanto os leitores que buscam uma compreensão rápida do conteúdo."
    title-link="https://en.wikipedia.org/wiki/Automatic_summarization"
  />
  <FooterComponent />
</template>
