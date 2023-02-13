<template>
  <li>
    <div class="card-container">
      <div class="card-top">
        <div class="skeleton skeleton-text skeleton-paragraph"></div>
        <div class="skeleton skeleton-text skeleton-paragraph"></div>
      </div>
      <div class="card-bottom skeleton skeleton-text"></div>
    </div>
  </li>
</template>

<style scoped>
.card-container {
  background: white;
  border-radius: 5px;
  margin: 15px 0px;
  width: 650px;
  height: 180px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.skeleton-paragraph {
  border-radius: 0.25rem;
}

.card-top {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: auto;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.skeleton-text {
  width: 100%;
  height: 0.7rem;
}
</style>
