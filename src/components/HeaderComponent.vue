<template>
  <div class="br-top">
    <div class="br-el-1">
      <a href="https://gov.br" class="br-link" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="19" viewBox="0 0 1000 700">
          <path fill="#00923F" d="M0 0h1000v700H0z" />
          <path fill="#F8C300" d="M500 85L85 350l415 265 415-265L500 85z" />
          <circle fill="#28166F" cx="499" cy="350" r="174" />
          <path
            fill="#FFF"
            d="M395 296c103 0 199 38 272 101 2-8 4-17 5-26-75-61-172-98-277-98-18 0-36 1-53 3-3 8-6 16-9 25 20-3 41-4 63-4z"
          />
        </svg>
        &nbsp; BRASIL
      </a>
    </div>
    <div class="br-el-2">Ferramenta para Jornalistas</div>
  </div>
  <header>
    <a href="https://ifgoiano.edu.br/home/" target="_blank" class="title-a">
      <span class="top-title">IF GOIANO</span>
      <h1>Instituto Federal Goiano</h1>
      <span class="bottom-title">MINISTÉRIO DA EDUCAÇÃO</span>
    </a>
    <a href="https://ifgoiano.edu.br/home/" target="_blank">
      <img src="../assets/ifgoiano_v2.png" />
    </a>
  </header>
</template>

<style scoped>
.br-top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #606060;
  background-color: #f1f1f1;
  text-align: center;
}
.br-el-1 {
  display: flex;
  padding: 0.4em;
  padding-right: 3em;
  flex: 1;
  justify-content: flex-end;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 12pt;
  border-right: 0.2em solid #dfdfdf;
}
.br-el-2 {
  display: flex;
  flex: 2;
  padding: 0.4em;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 12pt;
}
.br-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12pt;
  color: inherit;
  text-decoration: none;
  text-wrap: wrap;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  background: linear-gradient(to bottom, #195128, #107723, #195128);
  color: white;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.title-a {
  color: inherit;
  text-decoration: none;
  line-height: 210%;
}
img {
  width: 5rem;
  height: 6rem;
}
h1 {
  font-weight: bold;
  font-size: 32pt;
  text-wrap: wrap;
}
.top-title {
  font-size: 12pt;
  display: block;
  text-wrap: wrap;
}
.bottom-title {
  display: block;
  font-size: 14pt;
  text-wrap: wrap;
}
</style>
