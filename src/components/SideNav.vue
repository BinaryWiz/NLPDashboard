<template>
  <div id="sidenav" class="flex-shrink-0 p-3 bg-dark">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-5 fw-semibold text-white">
        <img id="logo" :src="require(`../assets/logo.png`)" class="d-inline-block align-top">
        NLP Dashboard
      </span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1 ">
        <button class="btn btn-toggle align-items-center rounded collapsed text-white" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Models
        </button>
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-light rounded" v-for="name in modelOptions" :key="name" @click="changeModel(name)" :class="name == modelName ? 'highlight-background' : ''">{{ name }}</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed text-white" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
          Tables
        </button>
        <div class="collapse show" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li v-for="table in availableTables" :key="table"><a href="#" class="link-light rounded" :class="table == currentTable ? 'highlight-background' : ''" @click="changeTable(table)">{{ table }}</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    changeModel (newModel) {
      this.$store.commit('changeModel', newModel)
    },
    changeTable (newTable) {
      this.$store.commit('changeTable', newTable)
    }
  },
  computed: {
    modelName () {
      return this.$store.state.currentModel
    },
    modelOptions () {
      return this.$store.state.availableModels
    },
    currentTable () {
      return this.$store.state.currentTable
    },
    availableTables () {
      return this.$store.state.availableTables
    }
  }
}
</script>


<style scoped>
#sidenav {
  height: 100%;
  width: 13%;
  min-width: 230px;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 3px 4px 10px -2px rgba(0,0,0,0.25);
  -webkit-box-shadow: 3px 4px 10px -2px rgba(0,0,0,0.25);
  -moz-box-shadow: 3px 4px 10px -2px rgba(0,0,0,0.25);
}

#logo {
  width: 32px;
  height: 32px;
  margin-right: 3px;
}

.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle {
  color: white;
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: 600;
  background-color: transparent;
  border: 0;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: white;
  background-color: rgba(4, 93, 233, 1);
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
  color: white;
}

.btn-toggle[aria-expanded="true"] {
  color: white;
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: rgba(4, 93, 233, 1);
}

.scrollarea {
  overflow-y: auto;
}

.highlight-background {
  background-color: rgba(4, 93, 233, 1);
}

.fw-semibold { font-weight: 600; }
.lh-tight { line-height: 1.25; }
</style>
