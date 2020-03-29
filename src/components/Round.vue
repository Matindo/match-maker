//Round.vue

<template>
  <div class="round table-responsive-md">
    <table class="table table-sm table-stripped">
      <thead class="bg-info">
        <tr><th colspan="4" class="th-dark">{{ round }}</th></tr>
        <tr>
          <th scope="col">Proposer</th>
          <th scope="col">vs</th>
          <th scope="col">Opposer</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in matches" :key="index">
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
            <button class="btn btn-block btn-success" :disabled="!enabled" @click="saveRound" v-if="show">Save Round Results</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { nSQL } from '@nano-sql/core'

export default {
  name: 'Round',

  props: ['prop', 'opp', 'round', 'table'],

  data: function () {
    return {
      matches: [],
      show: true,
      enabled: true,
      msg: ''
    }
  },

  methods: {
    saveRound: function () {
      for (let i = 0; i < this.matches.length; i++) {
        if (this.matches[i].result === 'draw') {
          if (this.round === 'Round 1') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round1: 'D' }, { tId: this.matches[i].oid, round1: 'D' }]).exec()
          } else if (this.round === 'Round 2') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round2: 'D' }, { tId: this.matches[i].oid, round2: 'D' }]).exec()
          } else if (this.round === 'Round 3') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round3: 'D' }, { tId: this.matches[i].oid, round3: 'D' }]).exec()
          }
        } else if (this.matches[i].result === 'home') {
          if (this.round === 'Round 1') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round1: 'W' }, { tId: this.matches[i].oid, round1: 'L' }]).exec()
          } else if (this.round === 'Round 2') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round2: 'W' }, { tId: this.matches[i].oid, round2: 'L' }]).exec()
          } else if (this.round === 'Round 3') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round3: 'W' }, { tId: this.matches[i].oid, round3: 'L' }]).exec()
          }
        } else if (this.matches[i].result === 'away') {
          if (this.round === 'Round 1') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round1: 'L' }, { tId: this.matches[i].oid, round1: 'W' }]).exec()
          } else if (this.round === 'Round 2') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round2: 'L' }, { tId: this.matches[i].oid, round2: 'W' }]).exec()
          } else if (this.round === 'Round 3') {
            nSQL(this.table).query('upsert', [{ tId: this.matches[i].pid, round3: 'L' }, { tId: this.matches[i].oid, round3: 'W' }]).exec()
          }
        } else if (this.matches[i].result === '') {
          this.msg += 'There is a blank result. Please recheck ' + this.matches[i].prop + ' vs ' + this.matches[i].opp + '\n'
          this.enabled = true
        }
      }
      this.setPoints()
      this.show = false
      nSQL(this.table).query('select').exec().then((rows) => {
        this.$store.dispatch('LOAD_TEAMS', rows)
      })
    },
    validate: function () {
      var count = this.matches.length
      for (let i = 0; i < count; i++) {
        if (this.matches[i].result === '') {
          this.enabled = false
        } else {
          this.enabled = true
        }
      }
    },
    setPoints: function () {
      var teams = []
      nSQL(this.table).query('select').exec().then((rows) => {
        teams = rows
      })
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
        nSQL(this.table).query('upsert', { tId: teams[i].tId, points: pnts }).exec().then(() => { this.msg = 'updated ' + teams[i].tId }).catch((err) => { this.msg = err })
      }
    },
    setMatches: function () {
      var count = this.opp.length
      for (let i = 0; i < count; i++) {
        var match = { pid: this.prop[i].tId, prop: this.prop[i].teamName, oid: this.opp[i].tId, opp: this.opp[i].teamName, result: '' }
        this.matches.push(match)
      }
    }
  },

  mounted: function () {
    this.setMatches()
  }
}

</script>

<style scoped>
table {
  margin: 5px
}
</style>
