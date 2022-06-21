<template>
<div class="vx-col md:w-full w-full mb-base">
    <vs-popup title="Area Quirúrgica" :active.sync="modalAreas">
        <div class="vx-row">
            <div class="vx-col w-full" align="left">
                <label>Especialidad</label>
                <v-select class="mb-4 w-full" v-model="especialidadSelect" :options="listaEspecialidades" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col w-full" align="left">
                <label>Médico</label>
                <v-select class="mb-4 w-full" v-model="medicoSelect" :options="listaMedicos" label="medico" placeholder="Seleccione..." />
            </div>

            <div class="vx-col  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Seguimiento" v-model="areas.observacion" maxlength="250" placeholder="Motivo del seguimiento" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <flat-pickr :config="configdateTimePicker" v-model="areas.fseguimiento" style="width: 210px; display: inline-block;" placeholder="Fecha seguimiento" class="m-2" />
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-4 ">
                <vs-radio class="m-1" color="success" v-model="areas.estado" vs-value="1">Realizada</vs-radio><br />
                <vs-radio class="m-1" color="warning" v-model="areas.estado" vs-value="2">Pendiente</vs-radio><br />
                <vs-radio class="m-1" color="danger" v-model="areas.estado" vs-value="0">Cancelada</vs-radio>
            </div>
            <div class="vx-col w-full mt-4">
                <vs-button icon-pack="feather" icon="icon-plus" class="mr-2" color="success" @click="verificarDatos()">Guardar</vs-button>
            </div>
        </div>
    </vs-popup>

    <!-- //detalles empresa -->
    <vs-popup title="Detalles médico" :active.sync="modalDetalles">
        <vs-list v-if="datoMedico.medico_nombres != null">
            <vs-list-item title="Médico" :subtitle="datoMedico.medico_nombres + ' ' + datoMedico.medico_apellidos "></vs-list-item>
            <vs-list-item title="Cédula" :subtitle="datoMedico.cedula"></vs-list-item>
            <vs-list-item title="Email" :subtitle="datoMedico.email"></vs-list-item>
            <vs-list-item title="Fecha nacimiento" :subtitle="datoMedico.fnacimiento"></vs-list-item>
            <vs-list-item title="Convencional" :subtitle="datoMedico.convencional"></vs-list-item>
            <vs-list-item title="Movil" :subtitle="datoMedico.movil"></vs-list-item>
            <vs-list-item title="Dirección" :subtitle="datoMedico.direccion"></vs-list-item>
            <vs-list-item title="Especialista" :subtitle="datoMedico.medico_especialidad"></vs-list-item>
        </vs-list>
    </vs-popup>
    <vs-card v-if="lookReport == true" style="heigth:1000px;">
        <vs-button radius color="success" @click="lookReport = false;" type="gradient" icon="reply"></vs-button>
        <vs-divider>Generar reporte estadisto</vs-divider>
        <div v-if="status == 'yes'">
            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <flat-pickr :config="configdateTimePicker" v-model="fromDate" placeholder="Fecha Inicio" class="m-1" style="display: inline-block;width: 100%;" />
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                    <flat-pickr :config="configdateTimePicker" v-model="toDate" placeholder="Fecha Fin" class="m-1" style="display: inline-block;width: 100%" />
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" style="margin-top:20px;">
                    <vs-button type="gradient" @click="filtrarReporte();reporte=1;">Generar Reporte</vs-button>
                </vs-col>
            </vs-row>
        </div>

        <ReporteVisitas class="mt-1" :ReportVisitas="ReportVisitas" />
    </vs-card>
    <vx-card v-else>
        <div class="vx-col w-full mt-2">
            <div class="flex">
                <vs-button icon-pack="feather" icon="icon-plus" class="mr-2" color="primary" @click="agregarModal()">Agregar</vs-button>
                <vs-button icon-pack="feather" icon="icon-file" class="mr-2" color="success" @click="filtroReporte()">Reporte General</vs-button>
            </div>
        </div>
        <vs-table stripe pagination max-items="30" search :data="listaQuirurgicas">
            <template slot="header">
                <p>Cantidad: {{listaQuirurgicas.length}} </p>
            </template>
            <template slot="thead">
                <vs-th style="max-width: 20px;">#</vs-th>
                <vs-th>Medico</vs-th>
                <vs-th>Asesor</vs-th>
                <vs-th>Seguimiento</vs-th>
                <vs-th>Acciones</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td>
                        {{indextr+1}}
                    </vs-td>
                    <vs-td>
                        <a href="#" @click="filtroMedico(data[indextr])" style="text-decoration: underline;">
                            {{data[indextr].medico_nombres }}
                            {{data[indextr].medico_apellidos }} </a>
                        <br />
                        <small>{{data[indextr].name_especialidad }} </small><br />
                        <vs-chip v-if="data[indextr].quirur_estado == 0">Cancelada</vs-chip>
                        <vs-chip v-if="data[indextr].quirur_estado == 1" color="success">Realizada</vs-chip>
                        <vs-chip v-if="data[indextr].quirur_estado == 2" color="warning">Pendiente</vs-chip>
                    </vs-td>
                    <vs-td>
                        {{data[indextr].usuario_nombres }}
                        {{data[indextr].usuario_apellidos }}
                    </vs-td>
                    <vs-td>
                        {{data[indextr].observacion }} <br />
                        {{data[indextr].fseguimiento }}
                    </vs-td>
                    <vs-td>
                        <vx-tooltip style="display: inline-block;" text="editar" position="top" color="warning">
                            <vs-button class="modal-default-button" size="small" color="warning" @click="agregarModal(data[indextr])" type="filled" icon-pack="feather" icon="icon-edit"> </vs-button>
                        </vx-tooltip> &nbsp;
                        <vx-tooltip style="display: inline-block;" text="editar" position="top" color="danger">
                            <vs-button class="modal-default-button" size="small" color="danger" @click="confirmarEliminar(data[indextr])" type="filled" icon-pack="feather" icon="icon-trash"> </vs-button>
                        </vx-tooltip>
                        <vx-tooltip style="display: inline-block;" text="Reporte individual" position="top" color="primary">
                            <vs-button class="modal-default-button ml-2" size="small" color="primary" @click="filtroReporteIndividual(data[indextr]);reporte=2;id=tr.idmedico" type="filled" icon-pack="feather" icon="icon-file"> </vs-button>
                        </vx-tooltip>
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>

    </vx-card>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component';

import 'flatpickr/dist/flatpickr.css';
import ReporteVisitas from './components/ReporteVisitas.vue';
import moment from "moment";
export default {
    components: {
        'v-select': vSelect,
        flatPickr,
        ReporteVisitas
    },
    data() {
        return {
            configdateTimePicker: {
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
            },
            modalAreas: false,
            modalDetalles: false,
            listaEspecialidades: [],
            especialidadSelect: '',
            listaMedicos: [],
            listaQuirurgicas: [],
            medicoSelect: '',
            areas: {
                'id': '',
                'idmedico': '',
                'idespecialidad': '',
                'fseguimiento': '',
                'estado': '',
                'observacion': '',
            },
            datoEliminar: '',
            datoMedico: {},
            /*VARIABLE PARA LOS REPORTE */
            lookReport: false,
            fromDate: null,
            toDate: null,
            configdateTimePicker: {
                enableTime: true,
                dateFormat: 'Y-m-d'
            },
            ReportVisitas: [],
            reporte: 1,
            id: 0,
            status: 'yes',
            //**FIN VARIABLES PARA LOS REPORTES */
            user_admin: false,
            user_visitas: false,
        }
    },
    mounted() {
        let me = this;
        me.user = JSON.parse(localStorage.getItem("usuario"))
        if (me.user.id_group == 1) {
            me.user_admin = true;
        }
        if (me.user.id_group == 2) {
            me.user_visitas = true;
        }
        me.getEspecialidades();
        me.getMedicos();
        me.getAreasQuirurgicas();
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        me.fromDate = primerDia
        me.toDate = ultimoDia
        let statusReporte = localStorage.getItem("reporte")
        if (statusReporte == "yes") {
            me.lookReport = true
        }
    },
    methods: {
        async getEspecialidades() {
            let me = this;
            // me.$vs.loading();
            me.modalEspec = false;
            this.$http.get(this.$server_url + "h_especialidades")
                .then(function (response) {
                    me.listaEspecialidades = response.data
                    // me.$vs.loading.close()
                });
        },
        async getMedicos() {
            let me = this;
            // me.$vs.loading();
            me.modalMedicos = false;
            this.$http.get(this.$server_url + "listaMedicos")
                .then(function (response) {
                    me.listaMedicos = response.data
                    // me.$vs.loading.close()
                });
        },
        getAreasQuirurgicas() {
            let me = this;
            me.$vs.loading()
            me.modalAreas = false;
            if (me.user_admin) {
            this.$http.get(this.$server_url + "h_quirurgicas")
                .then(function (response) {
                    me.listaQuirurgicas = response.data
                    me.$vs.loading.close()
                });
            }
            if (me.user_visitas) {
                this.$http.get(this.$server_url + "quirurgicasUser/"+me.user.idusuario)
                .then(function (response) {
                    me.listaQuirurgicas = response.data
                    me.$vs.loading.close()
                });
            }
        },
        filtroMedico(item) {
            let me = this;
            // console.log(item)
            me.datoMedico = {};
            for (let index = 0; index < me.listaQuirurgicas.length; index++) {
                if (me.listaQuirurgicas[index].idmedico == item.idmedico) {
                    me.datoMedico = me.listaQuirurgicas[index];
                }
            }
            me.modalDetalles = true;
        },
        agregarModal(item) {
            let me = this;
            console.log(item)
            me.especialidadSelect = {}
            me.medicoSelect = {}
            me.areas = {
                'id': '',
                'idmedico': '',
                'idespecialidad': '',
                'fseguimiento': '',
                'estado': '',
                'observacion': '',
            };
            if (item != null) {
                // me.areas = item;
                // me.areas.idmedico = item.idmedico != null ? item.idmedico : ''
                // me.areas.idespecialidad = item.idespecialidad != null ? item.idespecialidad : ''
                me.areas.id = item.idquirurgica != null ? item.idquirurgica : ''
                me.areas.fseguimiento = item.fseguimiento != null ? item.fseguimiento : ''
                me.areas.estado = item.quirur_estado != null ? item.quirur_estado : ''
                me.areas.observacion = item.observacion != null ? item.observacion : ''
                me.especialidadSelect = {
                    'id': item.idespecialidad,
                    'nombre': item.name_especialidad
                }
                me.medicoSelect = {
                    'idusuario': item.idmedico,
                    'medico': item.medico_nombres + ' ' + item.medico_apellidos
                }
            }
            // console.log(me.areas)
            me.modalAreas = true;
        },
        verificarDatos() {
            let me = this;
            if (me.especialidadSelect == null || me.especialidadSelect.nombre == null || me.especialidadSelect.nombre == "") {
                me.$vs.notify({
                    text: "Seleccione la especialidad",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.medicoSelect == null || me.medicoSelect.idusuario == null || me.medicoSelect.idusuario == "") {
                me.$vs.notify({
                    text: "Seleccione el médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.areas.fseguimiento == null || me.areas.fseguimiento == "") {
                me.$vs.notify({
                    text: "Seleccione la fecha del seguimiento",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.areas.estado == null || me.areas.estado == "") {
                me.$vs.notify({
                    text: "Seleccione el estado del seguimiento",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            console.log(me.areas)
            me.$vs.loading()
            let formdata = new FormData();
            formdata.append('id', me.areas.id);
            formdata.append('idmedico', me.medicoSelect.idusuario);
            formdata.append('idespecialidad', me.especialidadSelect.id);
            formdata.append('fseguimiento', me.areas.fseguimiento);
            formdata.append('estado', me.areas.estado);
            formdata.append('observacion', me.areas.observacion);
            formdata.append('idusuario', me.user.idusuario);
            this.$http.post(this.$server_url + 'h_quirurgicas', formdata)
                .then(function (res) {
                    me.getAreasQuirurgicas();
                    me.$vs.loading.close()
                })
                .catch(function (error) {
                    console.log(error)
                    me.$vs.loading.close()
                })
        },
        confirmarEliminar(item) {
            let me = this;
            me.datoEliminar = item;
            console.log(item)
            me.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmación',
                text: 'Estas seguro de eliminar este seguimiento, esta acción no se podrá deshacer',
                acceptText: 'Aceptar',
                accept: me.eliminarVisita
            })
        },
        eliminarVisita() {
            let me = this;
            me.$vs.loading();
            this.$http.delete(this.$server_url + "h_quirurgicas/" + me.datoEliminar.id)
                .then(function (res) {
                    // console.log(res.data)
                    me.$vs.notify({
                        text: "Seguimiento eliminado correctamente",
                        color: 'danger',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    me.getAreasQuirurgicas();
                    me.$vs.loading.close();
                });
        },
        //REPORTES
        filtroReporte() {
            let me = this;
            me.lookReport = true;
            localStorage.setItem('ReportVisitas', '')
            localStorage.setItem('individual', "no")
            localStorage.setItem('reporte', 'yes')
            localStorage.setItem('quiruguica', "yes")
            localStorage.setItem('tituloReporte', "Reporte General de visitas a los médicos")
            me.status = "yes"
        },
        filtroReporteIndividual(tr) {
            let me = this;
            localStorage.setItem('ReportVisitas', '')
            localStorage.setItem('reporte', 'yes')
            localStorage.setItem('idmedico', tr.idmedico)
            localStorage.setItem('individual', "yes")
            localStorage.setItem('quiruguica', "yes")
            localStorage.setItem('tituloReporte', `Reporte individual de visitas por estado al médico/a ${tr.nombres} ${tr.apellidos}`)
            me.lookReport = true;
            me.status = "yes"
        },
        filtrarReporte() {
            let me = this;
            if (me.fromDate == null) {
                me.$vs.notify({
                    text: 'Debe escoger una fecha inicio',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check'
                })
                return false;
            }
            if (me.toDate == null) {
                me.$vs.notify({
                    text: 'Debe escoger una fecha final',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check'
                })
                return false;
            }
            if (me.fromDate > me.toDate) {
                me.$vs.notify({
                    text: 'La fecha inicio no puede mayor que la fecha final',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check'
                })
                return false;
            }
            let from = moment(me.fromDate).format('YYYY-MM-DD')
            let to = moment(me.toDate).format('YYYY-MM-DD')
            me.$vs.loading()
            if (me.reporte == 1) {
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate=" + from + '&toDate=' + to + '&quiruguica=yes')
                    .then(function (res) {
                        me.$vs.loading.close()
                        console.log('ol', res.data)
                        localStorage.setItem('ReportVisitas', JSON.stringify(res.data))
                        me.ReportVisitas = res.data
                        localStorage.setItem('reporte', 'no')
                        me.$router.push('/reporte/visitas')

                    })
                    .catch(function (e) {
                        me.$vs.loading.close()
                    });
            } else {
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate=" + from + '&toDate=' + to + '&id=' + me.id + '&quiruguica=yes')
                    .then(function (res) {
                        me.$vs.loading.close()
                        localStorage.setItem('ReportVisitas', JSON.stringify(res.data))
                        me.ReportVisitas = res.data
                        localStorage.setItem('reporte', 'no')
                        me.$router.push('/reporte/visitas')

                    })
                    .catch(function (e) {
                        me.$vs.loading.close()
                    });
            }

        },

        //FIN METODOS REPORTES
    }
}
</script>
