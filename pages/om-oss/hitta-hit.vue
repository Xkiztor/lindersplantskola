<script setup>
useSeoMeta({
  title: 'Hitta hit - Linders Plantskola',
  ogTitle: 'Hitta hit',
  description: 'Här är en vägbeskrivning ifall du behöver hjälp att hitta rätt.',
  ogDescription: 'Här är en vägbeskrivning ifall du behöver hjälp att hitta rätt.',
});
</script>

<template>
  <div class="article hitta-hit">
    <h1 class="title">Hitta hit</h1>
    <a href="https://maps.app.goo.gl/fJe2UufN3xotQrbS6" target="_blank">
      <h1 class="subtitle"><Icon name="mdi:google-maps" /> Köinge 6902, Hörby 242 92</h1>
    </a>
    <p>
      Linders Plantskola hittar du i Köinge ca 4,5 km sydöst om Hörby. Köinge finns på två ställen.
      Detta är ”Köinge by”, det Köinge som ligger närmast Hörby.
    </p>
    <p>
      Från E22:an tag avfart ”Hörby norra” och kör rakt igenom Hörby och ut Kungsgatan som sedan
      byter namn till Råbyvägen. (För att komma rakt igenom Hörby måsta man köra vänster en kort
      sträcka på Storgatan och sen höger i korsningen in på Kungsgatan). Följ Råbyvägen förbi
      Lantmännen och Vårdcentralen och ut i landskapet och sväng vänster först när det står
      Motocrossbana och Äspinge. Nu börjar du närma dig. Kör ca 300 m, vägen kröker lite till höger
      och går mellan två gårdar. Direkt därefter gör huvudvägen en 90-graders sväng åt vänster men
      här skall du istället köra rakt fram på en mindre väg. Sen ligger vi som första gård på
      vänster hand. Lycka till! Se noga på kartan innan du kör!
    </p>
    <p>Man kan också ta buss 471 och gå av vid Råby Gård och sen gå 2 km österut.</p>
    <p>Välkommen!</p>
  </div>
</template>

<style>
.article .subtitle {
  font-size: 1.25rem;
}

.article p {
  margin-top: 0.5rem;
  max-width: 50ch;
  line-height: 1.25;
}

.article a {
  color: var(--link-color);
}
</style>
