// Index.js Vuex store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    tournaments: [],
    tournament: {},
    teams: []
  },

  getters: {
    TOURNAMENT: function (state) {
      return state.tournament
    },
    TOURNAMENTS: function (state) {
      return state.tournaments
    },
    TEAMS: function (state) {
      return state.teams
    }
  },

  mutations: {
    SET_TOURNAMENT: function (state, id) {
      for (let u = 0; u < state.tournaments.length; u++) {
        if (state.tournaments[u].id === id) {
          state.tournament = state.tournaments[u]
        }
      }
    },
    SET_TOURNAMENTS: function (state, payload) {
      state.tournaments = payload
    },
    SET_TEAMS: function (state, payload) {
      state.teams = payload
    },
    DELETE_TOURNAMENT: function (state, id) {
      for (let i = 0; i < state.tournaments.length; i++) {
        if (state.tournaments[i].id === id) {
          state.tournaments.splice(i, 1)
        }
      }
    },
    ADD_TOURNAMENT: function (state, payload) {
      state.tournaments.push(payload)
    },
    EDIT_TOURNAMENT: function (state, tourn) {
      for (let i = 0; i < state.tournaments.length; i++) {
        if (state.tournaments[i].id === tourn.id) {
          state.tournaments.splice(i, 1, tourn)
        }
      }
    },
    SET_STATUS: function (state, status) {
      state.tournament.status = status
    },
    SET_STAGE: function (state, stage) {
      state.tournament.stage = stage
    }
  },

  actions: {
    USE_TOURNAMENT: function (context, id) {
      context.commit('SET_TOURNAMENT', id)
    },
    LOAD_TOURNAMENTS: function (context, payload) {
      context.commit('SET_TOURNAMENTS', payload)
    },
    LOAD_TEAMS: function (context, payload) {
      context.commit('SET_TEAMS', payload)
    },
    DELETE_TOURNAMENT: function (context, id) {
      context.commit('DELETE_TOURNAMENT', id)
    },
    ADD_TOURNAMENT: function (context, payload) {
      context.commit('ADD_TOURNAMENT', payload)
    },
    UPDATE_TOURNAMENT: function (context, payload) {
      context.commit('EDIT_TOURNAMENT', payload)
    },
    CHANGE_STATUS: function (context, payload) {
      context.commit('SET_STATUS', payload)
    },
    CHANGE_STAGE: function (context, payload) {
      context.commit('SET_STAGE', payload)
    }
  }

})

export default store
