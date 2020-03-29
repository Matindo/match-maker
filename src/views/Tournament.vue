//Tournament.vue

<template>
  <div class="tournament">
    <h1>{{ title }}</h1>
    <div class="container">
      <form class="form-inline">
        <fieldset>
          <legend>Add Team: </legend>
          <input type="text" v-model="tname" placeholder="Team Name">
          <button class="btn btn-info btn-sm" @click.prevent="addTeam">Add Team</button>
        </fieldset>
      </form>
    </div>
    <div class="container">
      <table class="table table-responsive" :key="teams">
        <thead class="thead-dark">
          <tr>
            <th scope="col" class="d-none">#</th>
            <th scope="col">Team</th>
            <th scope="col">Round1</th>
            <th scope="col">Round2</th>
            <th scope="col">Round3</th>
            <th scope="col" class="">Points</th>
            <th scope="col">Score</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams" :key="index">
            <th scope="row" class="d-none">{{ team.tId }}</th>
            <td>{{ team.teamName }}</td>
            <td>{{ team.round1 }}</td>
            <td>{{ team.round2 }}</td>
            <td>{{ team.round3 }}</td>
            <td >{{ team.points }}</td>
            <td>{{ team.score }}</td>
            <td>
              <button class="btn btn-sm btn-success" @click="editTeam(index)"><font-awesome-icon :icon="['far', 'edit']" /></button>
              <button class="btn btn-sm btn-danger" @click="deleteTeam(team.tId)"><font-awesome-icon :icon="['far', 'trash-alt']" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <div class="col-12 d-block justify-content-center" v-if="stats === 'Created'">
        <button class="btn btn-block btn-warning" @click.prevent="drawRounds" v-if="!isOdd" :disabled="!(stats === 'Created')">Draw Rounds</button>
        <p v-if="isOdd" class="text-danger">Please ensure your team-count is even for pairing during rounds</p>
      </div>
      <div class="col-12 justify-content-center">
        <button class="btn btn-block btn-danger" @click.prevent="endTournament" v-if="stats === 'Running'">Finish Tournament</button>
        <button class="btn btn-block btn-secondary" @click.prevent="repeatTournament" v-if="stats === 'Closed'">Repeat Tournament</button>
      </div>
      <div class="col-12 d-inline-block" v-if="stats === 'Closed'">
        <div class="col-lg-4">
        </div>
        <div class="col-lg-4">
        </div>
        <div class="col-lg-4">
        </div>
      </div>
      <div class="col-12 d-inline-block" v-if="stats !== 'Closed'" :key="shuffledTeams">
        <div class="col-lg-4">
          <div class="table-responsive-sm">
            <table class="table table-sm table-stripped">
              <thead class="bg-info">
                <tr><th colspan="4" class="th-dark">Round 1</th></tr>
                <tr>
                  <th scope="col">Proposer</th>
                  <th scope="col">vs</th>
                  <th scope="col">Opposer</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(match, index) in round1" :key="index">
                  <td>{{ match.prop }}</td>
                  <td><strong>vs</strong></td>
                  <td>{{ match.opp }}</td>
                  <td>
                    <select v-model.number="match.result">
                      <option value="home">{{ match.prop }}</option>
                      <option value="draw">Draw</option>
                      <option value="away">{{ match.opp }}</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <span class="text-danger">{{ msg }}</span>
                    <button class="btn btn-block btn-success" @click.prevent="saveRound(1)">Save Round Results</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="table-responsive-sm">
            <table class="table table-sm table-stripped">
              <thead class="bg-info">
                <tr>
                  <th colspan="4" class="th-dark">Round 2</th>
                </tr>
                <tr>
                  <th scope="col">Proposer</th>
                  <th scope="col">vs</th>
                  <th scope="col">Opposer</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(match, index) in round2" :key="index">
                  <td>{{ match.prop }}</td>
                  <td><strong>vs</strong></td>
                  <td>{{ match.opp }}</td>
                  <td>
                    <select v-model.number="match.result">
                      <option value="home">{{ match.prop }}</option>
                      <option value="draw">Draw</option>
                      <option value="away">{{ match.opp }}</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <span class="text-danger">{{ msg }}</span>
                    <button class="btn btn-block btn-success" @click.prevent="saveRound(2)">Save Round Results</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="table-responsive-sm">
            <table class="table table-sm table-stripped">
              <thead class="bg-info">
                <tr>
                  <th colspan="4" class="th-dark">Round 3</th>
                </tr>
                <tr>
                  <th scope="col">Proposer</th>
                  <th scope="col">vs</th>
                  <th scope="col">Opposer</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(match, index) in round3" :key="index">
                  <td>{{ match.prop }}</td>
                  <td><strong>vs</strong></td>
                  <td>{{ match.opp }}</td>
                  <td>
                    <select v-model.number="match.result">
                      <option value="home">{{ match.prop }}</option>
                      <option value="draw">Draw</option>
                      <option value="away">{{ match.opp }}</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <span class="text-danger">{{ msg }}</span>
                    <button class="btn btn-block btn-success" @click.prevent="saveRound(3)">Save Round Results</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <transition name="fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">Edit Team</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form class="form">
                    <label for="tid">TID:</label>
                    <input v-model="currentTeam.tId" name="tid" disabled class="form-control">
                    <label for="tn">Team Name:</label>
                    <input class="form-control" name="tn" v-model="currentTeam.teamName">
                    <label for="r1">Round 1:</label>
                    <input class="form-control" name="r1" v-model="currentTeam.round1">
                    <label for="r2">Round 2:</label>
                    <input class="form-control" name="r2" v-model="currentTeam.round2">
                    <label for="r3">Round 3:</label>
                    <input class="form-control" name="r3" v-model="currentTeam.round3">
                    <label for="score">Score:</label>
                    <input class="form-control" name="score" v-model="currentTeam.score">
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                  <button type="button" class="btn btn-primary" @click="updateTeam">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { nSQL } from '@nano-sql/core'

export default {
  name: 'Tournament',

  data: function () {
    return {
      teams: [],
      shuffledTeams: [],
      p: [],
      o: [],
      o2: [],
      o3: [],
      round1: [],
      round2: [],
      round3: [],
      currentTeam: {},
      tname: '',
      msg: '',
      showModal: false
    }
  },

  computed: {
    tournament: function () {
      var id = this.$route.params.tid
      this.$store.dispatch('USE_TOURNAMENT', id)
      return this.$store.getters.TOURNAMENT
    },
    title: function () {
      return this.tournament.title
    },
    teamTable: function () {
      return this.tournament.teams
    },
    stats: function () {
      return this.tournament.status
    },
    isOdd: function () {
      var truth = true
      var count = this.teams.length
      if (count % 2 === 1) {
        truth = true
      } else if (count % 2 === 0) {
        truth = false
      }
      return truth
    }
  },

  methods: {
    loadTeams: function () {
      nSQL(this.teamTable).query('select').orderBy(['points DESC', 'score DESC', 'teamName ASC']).exec().then((rows) => {
        this.$store.dispatch('LOAD_TEAMS', rows)
        this.teams = rows
      })
    },
    addTeam: function () {
      var tname = this.tname
      nSQL(this.teamTable).query('upsert', { teamName: tname, round1: '-', round2: '-', round3: '-', points: 0, score: 0 }).exec().then(() => {
        this.loadTeams()
        this.tname = ''
      }).catch((err) => {
        this.msg = err
      })
    },
    deleteTeam: function (id) {
      nSQL(this.teamTable).query('delete').where(['tId', '=', id]).exec().then(() => {
        this.loadTeams()
      })
    },
    updateTeam: function () {
      nSQL(this.teamTable).query('upsert', { tId: this.currentTeam.tId, teamName: this.currentTeam.teamName, round1: this.currentTeam.round1, round2: this.currentTeam.round2, round3: this.currentTeam.round3, points: this.currentTeam.points, score: this.currentTeam.score }).exec().then(() => {
        this.loadTeams()
        this.showModal = false
      })
    },
    editTeam: function (i) {
      this.currentTeam = this.teams[i]
      this.showModal = true
    },
    shuffleTeams: function () {
      // The Fisher-Yates shuffle
      this.shuffledTeams = [].concat(this.teams)
      var counter = this.teams.length
      while (counter) {
        var rand = Math.floor(Math.random() * counter--)
        var temp = this.shuffledTeams[counter]
        this.shuffledTeams[counter] = this.shuffledTeams[rand]
        this.shuffledTeams[rand] = temp
      }
    },
    drawRounds: function () {
      this.shuffleTeams()
      var ts = [].concat(this.shuffledTeams)
      const halfway = ts.length / 2
      this.p = ts.slice(0, halfway)
      this.o = ts.slice(halfway, ts.length)
      this.o2 = this.o.slice(1, this.o.length)
      this.o2.push(this.o[0])
      this.o3 = this.o2.slice(1, this.o2.length)
      this.o3.push(this.o2[0])
      var round1 = []
      var round2 = []
      var round3 = []
      for (let i = 0; i < halfway; i++) {
        var match = { pid: this.p[i].tId, prop: this.p[i].teamName, oid: this.o[i].oid, opp: this.o[i].teamName, result: '' }
        var match2 = { pid: this.o2[i].tId, prop: this.o2[i].teamName, oid: this.p[i].tId, opp: this.p[i].teamName, result: '' }
        var match3 = { pid: this.p[i].tId, prop: this.p[i].teamName, oid: this.o3[i].tId, opp: this.o3[i].teamName, result: '' }
        round1.push(match)
        round2.push(match2)
        round3.push(match3)
      }
      this.round1 = [].concat(round1)
      this.round2 = [].concat(round2)
      this.round3 = [].concat(round3)
    },
    setPoints: function () {
      var teams = [].concat(this.teams)
      for (let i = 0; i < teams.length; i++) {
        var pnts = 0
        if (teams[i].round1 === 'W') {
          pnts += 3
        } else if (teams[i].round1 === 'D') {
          pnts += 1
        }
        if (teams[i].round2 === 'W') {
          pnts += 3
        } else if (teams[i].round2 === 'D') {
          pnts += 1
        }
        if (teams[i].round3 === 'W') {
          pnts += 3
        } else if (teams[i].round3 === 'D') {
          pnts += 1
        }
        nSQL(this.teamTable).query('upsert', { tId: teams[i].tId, points: pnts }).exec()
      }
    },
    saveRound: function (rnd) {
      var half = this.teams.length / 2
      for (let i = 0; i < half; i++) {
        if (rnd === 1) {
          if (this.round1[i].result === 'draw') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round1[i].pid, round1: 'D' }, { tId: this.round1[i].oid, round1: 'D' }]).exec()
          } else if (this.round1[i].result === 'home') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round1[i].pid, round1: 'W' }, { tId: this.round1[i].oid, round1: 'L' }]).exec()
          } else if (this.round1[i].result === 'away') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round1[i].pid, round1: 'L' }, { tId: this.round1[i].oid, round1: 'W' }]).exec()
          }
        } else if (rnd === 2) {
          if (this.round2[i].result === 'draw') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round2[i].pid, round2: 'D' }, { tId: this.round2[i].oid, round2: 'D' }]).exec()
          } else if (this.round2[i].result === 'home') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round2[i].pid, round2: 'W' }, { tId: this.round2[i].oid, round2: 'L' }]).exec()
          } else if (this.round2[i].result === 'away') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round2[i].pid, round2: 'L' }, { tId: this.round2[i].oid, round2: 'W' }]).exec()
          }
        } else if (rnd === 3) {
          if (this.round3[i].result === 'draw') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round3[i].pid, round3: 'D' }, { tId: this.round3[i].oid, round3: 'D' }]).exec()
          } else if (this.round3[i].result === 'home') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round3[i].pid, round3: 'W' }, { tId: this.round3[i].oid, round3: 'L' }]).exec()
          } else if (this.round3[i].result === 'away') {
            nSQL(this.teamTable).query('upsert', [{ tId: this.round3[i].pid, round3: 'L' }, { tId: this.round3[i].oid, round3: 'W' }]).exec()
          }
        }
        this.setPoints()
      }
    }
  },

  created: function () {
    nSQL().query('create table', {
      name: this.teamTable,
      model: {
        'tId:int': { pk: true, ai: true },
        'teamName:string': { notNull: true },
        'round1:string': { default: '-' },
        'round2:string': { default: '-' },
        'round3:string': { default: '-' },
        'points:int': { default: 0 },
        'score:int': { default: 0 }
      }
    }).exec().then(() => {
      this.loadTeams()
    }).catch((error) => {
      this.msg = error
    })
  }
}
</script>

<style scoped>
.row {
  justify-content: justify;
}
input {
  margin-right: 5px
}
fieldset {
  border: 1px groove;
  padding: 2px
}
legend {
  width: auto;
  padding: 2px;
  font-size: 1.2em;
  text-align: left;
  font-weight: bold
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity 2.5s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-header, .modal-footer {
  background: skyblue;
}
.modal-footer {
  justify-content: center
}
.fade-enter-active{
  transition: opacity 1.5s;
}
.fade-leave-active {
  opacity: 0;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
