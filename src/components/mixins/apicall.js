import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  methods: {
    apiGet (url, callBack) {
      this.$store.dispatch('incrementCounter')
      const request = {
        method: 'GET',
        url: url
      }
      axios(request)
        .then(response => {
          this.successHandler(response, callBack)
        })
        .catch(error => {
          console.error(error)
        })
    },
    apiPost (url, data, callBack) {
      this.$store.dispatch('incrementCounter')
      const request = {
        method: 'POST',
        data: data,
        url: url
      }
      axios(request)
        .then(response => {
          this.successHandler(response, callBack)
        })
        .catch(error => {
          this.errorHandler(error)
        })
    },
    successHandler (response, callBack) {
      this.$store.dispatch('decrementCounter')
      callBack(response)
    },
    errorHandler (error) {
      console.error(error)
      this.$store.dispatch('addError', error)
      this.$store.dispatch('decrementCounter')
    }
  }
}
