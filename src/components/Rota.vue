<template>
  <div>
    <v-row justify="center">
      <rota-calendar
        :rotas="rotas"
        :users="users"
      ></rota-calendar>
    </v-row>
    <v-row justify="center">
      <v-card class="d-flext aligb-center mt-5">
        <v-card-title class="mt-4">Generate New Rota</v-card-title>
        <v-row>
          <v-date-picker v-model="rotaDate"></v-date-picker>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="generateNewRota"
          >Generate</v-btn>
          <v-btn
            color="error"
            @click="generateErrorCall"
          >Wrong Endpoint</v-btn>
        </v-card-actions>

      </v-card>
    </v-row>
    <v-overlay :value="getOverlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
      :timeout="-1"
      :value="hasError"
      absolute
      top
    >
      <template v-slot:action="{ attrs }">
        <v-card>
          <v-card-title>ERROR</v-card-title>
          {{ getErrors }}
          <v-card-actions>
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="clearErrors"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-snackbar>

  </div>
</template>
<script>
import apicall from './mixins/apicall'
import RotaCalendar from './RotaCalendar.vue'
export default {
  name: 'Rota',
  mixins: [apicall],
  components: { RotaCalendar },
  data () {
    return {
      users: [],
      rotas: [],
      user: {},
      rota: {},
      rotaDate: new Date().toISOString().substr(0, 10),
      overlay: false
    }
  },
  computed: {
    getOverlay () {
      return this.$store.getters['getServiceCounter']
    },
    hasError () {
      return this.$store.getters['getErrors'].length > 0
    },
    getErrors () {
      return this.$store.getters['getErrors']
    }
  },
  mounted () {
    this.getUsers()
    this.getRotas()
  },
  methods: {
    clearErrors () {
      this.$store.dispatch('removeErrors')
    },
    generateNewRota () {
      const requestObj = {
        date: this.rotaDate
      }
      this.apiPost('/generate', requestObj, response => {
        this.getRota(response.data.rotaId)
      })
    },
    generateErrorCall () {
      const requestObj = {
        date: this.rotaDate
      }
      this.apiPost('/generaste', requestObj, response => {
        this.getRota(response.data.rotaId)
      })
    },
    getRota (rotaId) {
      this.apiGet(`/rota/${rotaId}`, response => {
        if (response.data) {
          let rotaExists = false
          this.rotas.forEach(e => {
            if (e.rotaID === response.data.rotaID) {
              rotaExists = true
            }
          })
          if (!rotaExists) {
            this.rotas.push(response.data)
            this.setRotaLabel()
          }
        }
      })
    },
    getUsers () {
      this.apiGet('/users', response => {
        this.users = response.data.users
      })
    },
    getRotas () {
      this.apiGet('/rotas', response => {
        this.rotas = response.data.rotas
        this.setRotaLabel()
      })
    },
    setRotaLabel () {
      this.rotas.forEach(e => {
        e.label = `${e.period.startDate} - ${e.period.endDate}`
      })
    }
  }
}
</script>