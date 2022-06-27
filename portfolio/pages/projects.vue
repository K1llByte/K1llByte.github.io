<template>
    <v-row justify="center" align="center">
        <v-col cols="16" sm="10" md="7">
            <v-row v-for="item in items" justify="center">
                <!-- Full Card -->
                <v-card class="ma-2 mx-auto">
                    <v-container>
                        <v-row no-gutters>
                            <!-- Left Card -->
                            <v-col
                            cols="12"
                            sm="5">
                                <v-card>
                                    <v-img
                                    class="white--text align-end"
                                    height="250px"
                                    :src="item.img">
                                        <v-card-title>{{item.title}}</v-card-title>
                                    </v-img>
                                </v-card>
                            </v-col>
                            <!-- Right Card -->
                            <v-col
                            cols="12"
                            sm="7">
                                <v-card-actions >
                                    <v-btn
                                    color="orange"
                                    block
                                    text
                                    :href="item.redirect">
                                        Github
                                    </v-btn>
                                </v-card-actions>
                                <v-card-text class="text--primary">
                                    <div>
                                        Whitehaven Beach<br/>
                                        <b>Lorem</b> ipsum dolor sit amet consectetur adipisicing elit. Incidunt fuga, perspiciatis nam sed nisi rerum mollitia sunt! Aliquid asperiores sequi dolorum temporibus nesciunt impedit et hic excepturi natus accusamus.
                                    </div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
        items: [
            { 
                title: 'Kazan Engine',
                img: 'https://camo.githubusercontent.com/f5265753dd313a60b82005dffcb1c9503fa819a0bd8cb226807a45b3b61eb3a2/68747470733a2f2f692e696d6775722e636f6d2f6d6954386a36742e706e67',
                redirect: 'https://github.com/K1llByte/kazan'
            },
            { 
                title: 'Ray Tracer',
                img: 'https://raw.githubusercontent.com/K1llByte/cool_rt/master/images/preview2.png',
                redirect: 'https://github.com/K1llByte/cool_rt'
            },
            { 
                title: 'Efficient FFT',
                img: 'https://i.imgur.com/nMRuKkl.png',
                redirect: 'https://github.com/K1llByte/master_thesis'
            },
            { 
                title: 'OpenGL Renderer',
                img: 'https://i.imgur.com/gXyBuIH.png',
                redirect: 'https://github.com/K1llByte/cg_project'
            }
        ]
    }
  }
}
</script>
