<template>
  <div class="home" :key="tournaments">
    <h1>Home</h1>
    <div>
      <p class="lead">Welcome to <a href="#">Match-Maker.com</a> where you'll run your debate with the ease of A-B-C and the swiftness of umm... well...whatever you deem swiftest in your life ;-).</p>
    </div>
    <h5>All Tournaments</h5>
    <div :key="tournaments.length">
      <div class="alert alert-dismissable alert-info fade show" v-if="showOperationStatus">{{operationStatus}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="showOperationStatus = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="form-inline">
        <div class="d-flex flex-row align-content-center">
          <label>Title :  </label>
          <input type="text" class="form-control input-sm" v-model="title">
        </div>
        <div>
          <button type="submit" class="btn btn-primary" @click.prevent="addTournament()">Add Tournament</button>
        </div>
      </form><br>
      <div class="d-flex justify-content-center">
        <div v-for="(tournament, index) in tournaments" :key="index" class="card text-center">
          <div class="card-body">
            <h5 class="card-title">{{tournament.title}}</h5>
            <p class="card-text">
              Status: <span :class="statusClass(tournament.status)">{{tournament.status}}</span>
            </p>
            <p class="card-text">
              Stage: <span :class="tournament.stage === 'Preliminaries' ? 'text-warning' : 'text-danger'">{{tournament.stage}}</span>
            </p>
          </div>
          <div class="card-footer">
            <button @click="openTournament(tournament.id)">OPEN</button>
            <button @click="deleteTournament(tournament.id)">DELETE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nSQL } from '@nano-sql/core'

export default {
  name: 'Home',
  data: function () {
    return {
      title: '',
      showOperationStatus: false,
      operationStatus: ''
    }
  },

  computed: {
    tournaments: function () {
      return this.$store.getters.TOURNAMENTS
    }
  },

  methods: {
    statusClass: function (status) {
      if (status === 'Created') {
        return 'text-secondary'
      } else if (status === 'Running') {
        return 'text-success'
      } else {
        return 'text-danger'
      }
    },
    // --------------------------------
    tournTableName: function (title) {
      return 'Tourn' + title.replace(/\s+/g, '')
    },
    // --------------------------------
    refreshData () {
      this.tournaments = this.$store.getters.TOURNAMENTS
    },
    // --------------------------------
    loadCSV () {
      var datafile = ''
      nSQL().loadCSV('tournaments', datafile, false).then(() => {
        nSQL('tournaments').query('select').exec().then((rows) => {
          this.$store.dispatch('LOAD_TOURNAMENTS', rows)
          this.refreshData()
          this.showOperationStatus = true
          this.operationStatus = 'CVS loaded'
        })
      })
    },
    // --------------------------------
    openTournament: function (id) {
      this.$router.push({ name: 'tournament', params: { tid: id } })
    },
    // --------------------------------
    deleteTournament: function (id) {
      nSQL('tournaments').query('delete').where(['id', '=', id]).exec().then(rows => {
        this.$store.dispatch('DELETE_TOURNAMENT', id)
        this.showOperationStatus = true
        this.operationStatus = `${rows.length} tournament deleted`
        this.refreshData()
      })
    },
    // --------------------------------
    addTournament: function () {
      var tournament = { id: null, title: this.title, status: 'Created', stage: 'Preliminaries', teams: '' }
      tournament.teams = this.tournTableName(this.title)
      nSQL('tournaments').query('upsert', { title: tournament.title, status: tournament.status, stage: tournament.stage, teams: tournament.teams }).exec().then(rows => {
        this.$store.dispatch('ADD_TOURNAMENT', tournament)
        this.showOperationStatus = true
        this.operationStatus = tournament.title + ' added'
        this.refreshData()
        this.title = ''
      })
    }
  }
}
</script>

<style scoped>
button {
  margin: 1px;
}
.row {
  justify-content: center
}
form {
  width: 100%;
  justify-content: center
}
.card {
  margin: 5px;
  width: 166px;
}
</style>
