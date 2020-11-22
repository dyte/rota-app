<template>
  <div class="mt-6">

    <v-divider></v-divider>
    <v-sheet
      tile
      class="d-flex"
      width="1000px"
    >
      <v-btn
        icon
        class="ma-2 col-1"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="user"
        :items="users"
        multiple
        dense
        outlined
        hide-details
        item-text="user"
        item-value="userId"
        label="Users"
        class="ma-2 col-3"
        clearable
      ></v-select>
      <v-select
        v-model="rota"
        :items="rotas"
        dense
        outlined
        hide-details
        item-text="label"
        item-value="rotaID"
        label="Rotas"
        class="ma-2 col-3"
        clearable
      ></v-select>
      <v-select
        v-model="shift"
        :items="shifts"
        dense
        outlined
        hide-details
        label="Shifts"
        class="ma-2 col-2"
        clearable
      ></v-select>
      <v-btn
        color="primary"
        dense
        outlined
        hide-details
        label="Shifts"
        class="ma-2 col-1"
        @click="filterChanged()"
      >Filter</v-btn>

      <v-btn
        icon
        class="
        ma-2 col-1"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="calendarType"
        :events="events"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
      ></v-calendar>

    </v-sheet>
  </div>
</template>


<script>
export default {
  name: 'rota-calendar',
  props: {
    rotas: {
      type: Array,
      default: () => []
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    rotas () {
      this.filterChanged()
    }
  },
  data: () => ({
    shifts: ['morning', 'afternoon'],
    rota: null,
    user: null,
    shift: '',
    calendarType: 'month',
    rotaItems: [],
    weekday: [1, 2, 3, 4, 5, 6, 0],
    startDate: '',
    endDate: '',

    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  methods: {
    filterChanged () {
      this.events = []
      let selectedRotas = []
      if (this.rota) {
        const selectedRota = this.rotas.find(e => e.rotaID === this.rota)
        selectedRotas = selectedRota.rota
        this.startDate = selectedRota.period.startDate
        this.endDate = selectedRota.period.endDate
      } else {
        this.rotas.forEach(e => {
          e.rota.forEach(t => selectedRotas.push(t))
        })
        this.startDate = ''
        this.endDate = ''
      }

      if (this.user && this.user.length > 0) {
        let userEvents = []
        this.user.forEach(u => {
          userEvents.push.apply(userEvents, selectedRotas.filter(e => e.userId === u))
        })
        selectedRotas = userEvents
      }

      if (this.shift) {
        selectedRotas = selectedRotas.filter(e => e.type === this.shift)
      }
      this.getEventsByFilter(selectedRotas)
    },
    getEventsByFilter (selectedRotas) {
      let events = []

      for (let i = 0; i < selectedRotas.length; i++) {
        events.push({
          name: this.users.find(e => e.userId === selectedRotas[i].userId).user, //this.names[this.rnd(0, this.names.length - 1)],
          start: selectedRotas[i].date,
          end: selectedRotas[i].date,
          color: selectedRotas[i].type === 'morning' ? 'blue' : 'purple',//this.colors[this.rnd(0, this.colors.length - 1)],
          timed: false,
        })
      }

      this.events = events

    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },

}
</script>