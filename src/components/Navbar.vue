<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img id="logo" :src="require(`../assets/logo.png`)" class="d-inline-block align-top">
        NLP Dashboard
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ modelName }}
            </a>
            <ul class="dropdown-menu active" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#" v-for="name in modelOptions" :key="name" @click="changeModel(name)">{{name}}</a></li>
            </ul>
          </li>
          <a class="nav-link active" href="#">Training</a>
          <a class="nav-link" href="#">Validation</a>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    changeModel (newModel) {
      this.$store.commit('changeModel', newModel)
    }
  },
  computed: {
    modelName () {
      return this.$store.state.currentModel
    },
    modelOptions () {
      return this.$store.state.availableModels
    }
  }
}
</script>

<style scoped>
nav {
  font-size: 20px;
  background-color: #045de9;
  background-image: linear-gradient(315deg, #045de9 0%, #0999f9 74%);
  height: 6%;
}

#logo {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
</style>
