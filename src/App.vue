//App.vue

<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Match-Maker</a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#myNav" aria-controls="myNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="navbar-collapse collapse" id="myNav" style="">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" data-toggle="collapse" data-target="#myNav">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" data-toggle="collapse" data-target="#myNav">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" data-toggle="collapse" data-target="#myNav">Contacts</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <router-view/>
    <div class="copyright bg-primary">
      &copy;BySonic Software 2020
    </div>
  </div>
</template>

<script>
import { nSQL } from '@nano-sql/core'

export default {
  name: 'App',

  methods: {
    createDatabase: function (db) {
      nSQL().createDatabase({
        id: db,
        mode: 'PERM',
        tables: [
          {
            name: 'tournaments',
            model: {
              'id:int': { pk: true, ai: true },
              'title:string': { notNull: true },
              'status:string': {},
              'stage:string': {},
              'teams:string': {}
            }
          }
        ]
      }).then(() => {
        this.msg = 'Created db successfully'
        nSQL().useDatabase(db)
        nSQL('tournaments').query('select').exec().then((rows) => {
          this.$store.dispatch('LOAD_TOURNAMENTS', rows)
        })
      }).catch(() => {
        this.msg = 'Couldn\'t create new db'
      })
    }
  },

  created: function () {
    this.createDatabase('matchmakerDB')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 15px
}
.copyright {
  bottom: 0;
  position: fixed;
  width: 100%;
  color: white
}
h1, h2, h3 {
  font-weight: lighter;
  color: green
}
</style>
