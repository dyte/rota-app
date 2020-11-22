<template>
  <v-app>
    <v-app-bar
      app
      color="blue lighten-4"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Lineten Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo-lineten.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">ROTA</span>

    </v-app-bar>

    <v-main>
      <Rota />
    </v-main>
  </v-app>
</template>

<script>
import Rota from './components/Rota';

export default {
  name: 'App',

  components: {
    Rota,
  },

  data: () => ({
    //
  }),
};
</script>
