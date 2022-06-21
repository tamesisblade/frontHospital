<template>
<div>
    <div class="vx-row mr-1">
        <div class="vx-col sm:w-1/2 w-full" v-if="user_admin">
            <vx-card class="m-2 mt-4">
                <h4>Visitas pendientes</h4>
                <div class="m-2" v-for="(section,index) in listaVisitasAdmin" :key="index">
                    <vs-list>
                        <vs-list-item icon-pack="feather" icon="icon-home" :title="section.empresa" :subtitle="section.fecha_visita + ' -  ' +section.observacion" />
                    </vs-list>
                </div>
            </vx-card>
        </div>
        <div class="vx-col sm:w-1/2 w-full" v-if="user_visitas">
            <vx-card class="m-2 mt-4">
                <h4>Mis visitas pendientes</h4>
                <div class="m-2" v-for="(section,index) in listaVisitas" :key="index">
                    <vs-list>
                        <vs-list-item icon-pack="feather" icon="icon-home" :title="section.empresa" :subtitle="section.fecha_visita + ' -  ' +section.observacion" />
                    </vs-list>
                </div>
            </vx-card>
        </div>
        <div class="vx-col sm:w-1/2 w-full" v-if="user_admin">
            <vx-card class="m-2 mt-4">
                <h4>Quirurgicas pendientes</h4>
                <div class="m-2" v-for="(section,index) in listaQuirurgicasAdmin" :key="index">
                    <vs-list>
                        <vs-list-item icon-pack="feather" icon="icon-home" :title="section.medico_nombres + ' ' + section.medico_apellidos" :subtitle="section.fseguimiento + ' -  ' +section.observacion" />
                    </vs-list>
                </div>
            </vx-card>
        </div>
        <div class="vx-col sm:w-1/2 w-full" v-if="user_visitas">
            <vx-card class="m-2 mt-4">
                <h4>Mis quirurgicas pendientes</h4>
                <div class="m-2" v-for="(section,index) in listaQuirurgicas" :key="index">
                    <vs-list>
                        <vs-list-item icon-pack="feather" icon="icon-aperture" :title="section.medico_nombres + ' ' + section.medico_apellidos" :subtitle="section.fseguimiento + ' -  ' +section.observacion" />
                    </vs-list>
                </div>
            </vx-card>
        </div>
        <div class="vx-col sm:w-1/2 w-full" v-if="listaMedicos.length > 0">
            <vx-card class="m-2 mt-4" title="Cumpleañeros" title-color="#135893" content-color="#135893" :card-background="'linear-gradient(220deg ,rgba(252, 249, 189,0.8), rgba(171, 234, 247,0.8)), url(' + card_bg_img_2 + ') no-repeat'" style="background-size: cover;">
                <div v-if="listaMedicos.length > 0">
                    <div class="m-2" v-for="(section,index) in listaMedicos" :key="index">
                        <vs-list>
                            <vs-list-item icon-pack="feather" icon="icon-gift" :title="section.nombres + ' ' + section.apellidos" :subtitle="section.fnacimiento" />
                        </vs-list>

                    </div>
                </div>
                <p class="m-6" v-else>No hay cumpleañeros en este mes.</p>
            </vx-card>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            card_bg_img_2: require('@/assets/images/pages/happy-birthday.jpg'),
            listaMedicos: [],
            listaVisitasAdmin: [],
            listaVisitas: [],
            usuario: '',
            user_admin:false,
            user_visitas:false,
            listaQuirurgicas:[],
            listaQuirurgicasAdmin:[],
        }
    },
    mounted() {
        let me = this;
        me.usuario = JSON.parse(localStorage.getItem('usuario'));
        console.log(me.usuario)
        if (me.usuario.id_group == 1) {
            me.user_admin = true;
            me.getVisitasAdmin();
            me.getQuirurgicasAdmin();
        }
        if (me.usuario.id_group == 2) {
            me.user_visitas = true;
            me.getVisitasPerfil();
            me.getQuirurgicasPerfil();
        }
            me.getMedicos();
    },
    methods: {
        getMedicos() {
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "birthday")
                .then(function (response) {
                    me.listaMedicos = response.data
                    me.$vs.loading.close()
                });
        },
        getVisitasAdmin() {
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "v_pendientes")
                .then(function (response) {
                    me.listaVisitasAdmin = response.data
                    me.$vs.loading.close()
                });
        },
        getVisitasPerfil(){
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "v_pendientesUser/"+me.usuario.idusuario)
                .then(function (response) {
                    me.listaVisitas = response.data
                    me.$vs.loading.close()
                });
        },
        getQuirurgicasAdmin(){
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "quirurgicas_pendientes")
                .then(function (response) {
                    me.listaQuirurgicasAdmin = response.data
                    me.$vs.loading.close()
                });
        },
        getQuirurgicasPerfil(){
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "qui_pendientesUser/"+me.usuario.idusuario)
                .then(function (response) {
                    me.listaQuirurgicas = response.data
                    me.$vs.loading.close()
                });
        },
    },
}
</script>
