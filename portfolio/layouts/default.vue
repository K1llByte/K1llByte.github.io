<template>
    <v-app dark flat>

        <v-app-bar
        :clipped-left="clipped"
        fixed
        app
        height="70">
            <!--
            <v-row justify="center" align="center">
            <v-col cols="16" sm="10" md="7">
            -->
                <!--
                <v-btn
                icon
                @click.stop="clipped = !clipped">
                    <v-icon>md-github</v-icon>
                </v-btn>
                -->
                <v-spacer/>

                <v-toolbar-title class="text-uppercase">
                    <span>Jorge</span>
                    <span class="font-weight-light">Mota</span>
                </v-toolbar-title>

                <v-tabs
                v-model="tab"
                right
                dark
                color="orange"
                icons-and-text>

                    <v-tab
                    background-color="orange"
                    href="/projects">
                        Projects
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-tab>

                    <v-tab
                    background-color="orange"
                    href="/about-me">
                        About Me
                        <v-icon>mdi-account</v-icon>
                    </v-tab>
                </v-tabs>
            <!--
            </v-col>
            </v-row>
            -->
        </v-app-bar>
        
        <v-main>
        <v-container>
            <Nuxt />
        </v-container>
        </v-main>

    </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Jorge Mota'
    }
  }
}
</script>
