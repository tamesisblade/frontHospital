<template>
<div class="vx-col md:w-full w-full mb-base">
    <vs-tabs>
        <vs-tab label="Visitas" @click="reporte()">
            <visitas  />
        </vs-tab>
        <vs-tab label="Área quirúrgica" @click="reporte()">
            <quirurgicas />
        </vs-tab>
        <vs-tab label="Médicos">
            <medicos />
        </vs-tab>
        <vs-tab label="Empresas">
            <empresas />
        </vs-tab>
        <vs-tab label="Especialidades">
            <especialidades />
        </vs-tab>
        <vs-tab label="Tipos">
            <tipos />
        </vs-tab>
    </vs-tabs>

</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import empresas from "./empresas.vue";
import visitas from "./visitas.vue";
import especialidades from "./especialidades.vue";
import quirurgicas from "./quirurgicas.vue";
import medicos from "./medicos.vue";
import tipos from "./tipos.vue";
import vSelect from 'vue-select';
export default {
    components: {
        'v-select': vSelect,
        empresas,
        visitas,
        especialidades,
        quirurgicas,
        medicos,
        tipos,
    },
    data() {
        return {}
    },
    mounted() {},
    methods: {
        reporte(){
            localStorage.setItem('reporte','no')
        }
    }
}
</script>
