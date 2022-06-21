<template>
<div class="vx-col md:w-full w-full mb-base">
    <vs-popup title="Visitas" :active.sync="modalVisitas">
        <div class="vx-row mt-2">
            <div class="vx-col w-full" align="left">
                <label>Empresa</label>
                <v-select class="mb-4 w-full" v-model="empresaSelect" :options="listaEmpresas" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <flat-pickr :config="configdateTimePicker" v-model="visita.fecha_visita" style="width: 210px; display: inline-block;" placeholder="Fecha visita" class="m-2" />
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-4 ">
                <vs-radio class="m-1" color="success" v-model="visita.estado" vs-value="1">Realizada</vs-radio><br />
                <vs-radio class="m-1" color="warning" v-model="visita.estado" vs-value="2">Pendiente</vs-radio><br />
                <vs-radio class="m-1" color="danger" v-model="visita.estado" vs-value="0">Cancelada</vs-radio>
            </div>
            <div class="vx-col w-full" align="left">
                <vs-textarea type="text" class="inputx w-full mb-4" label="Observacion" v-model="visita.observacion" maxlength="250" />
            </div>
            <div class="vx-col w-full mt-4">
                <vs-button icon-pack="feather" icon="icon-plus" class="mr-2" color="success" @click="verificarDatos()">Guardar</vs-button>
            </div>
        </div>
    </vs-popup>
    <!-- //detalles empresa -->
    <vs-popup title="Detalles empresa" :active.sync="modalDetalles">
        <vs-list v-if="datoEmpresa.nombre != null">
            <vs-list-item title="Nombre" :subtitle="datoEmpresa.nombre"></vs-list-item>
            <vs-list-item title="Direccion" :subtitle="datoEmpresa.direccion"></vs-list-item>
            <vs-list-item title="Convencional" :subtitle="datoEmpresa.convencional"></vs-list-item>
            <vs-list-item title="Movil" :subtitle="datoEmpresa.movil"></vs-list-item>
            <vs-list-item title="Email" :subtitle="datoEmpresa.email"></vs-list-item>
            <vs-list-item title="Encargado" :subtitle="datoEmpresa.encargado"></vs-list-item>
            <vs-list-item title="Numero de trabajadores" :subtitle="datoEmpresa.num_trabajadores.toString()"></vs-list-item>
            <vs-list-item title="Seguro" :subtitle="datoEmpresa.tipo_seguro"></vs-list-item>
            <vs-list-item title="Tipo" :subtitle="datoEmpresa.tipoNombre"></vs-list-item>
        </vs-list>
        <!-- //fin detalles empresa -->
    </vs-popup>
    <vs-card v-if="lookReport == true" style="heigth:1000px;">
        <vs-button radius color="success" @click="lookReport = false;" type="gradient" icon="reply"></vs-button>
        <vs-divider>Generar reporte estadisto Quirúrguico</vs-divider>
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
        <div>
            <vs-table stripe pagination max-items="30" search :data="misVisitas">
                <template slot="header">
                    <p>Cantidad: {{misVisitas.length}} </p>
                </template>
                <template slot="thead">
                    <vs-th style="max-width: 20px;">#</vs-th>
                    <vs-th>Empresa</vs-th>
                    <vs-th>Fecha / asesor</vs-th>
                    <vs-th>Observacion</vs-th>
                    <vs-th>Acciones</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            {{indextr+1}}
                        </vs-td>
                        <vs-td>
                            <p v-if="data[indextr].empresa != null" class="underline">
                                <!-- <a href="#" @click="filtroEmpresas(data[indextr].idempresa)">
                                    <vs-avatar size="small" icon-pack="feather" icon="icon-eye" /> </a> -->
                                <a href="#" @click="filtroEmpresas(data[indextr].idempresa)">{{data[indextr].empresa }}</a>
                            </p>
                            <span v-else> Sin empresa </span><br />
                            <vs-chip v-if="data[indextr].estado == 0"> Cancelada</vs-chip>
                            <vs-chip v-if="data[indextr].estado == 1" color="success"> Realizada</vs-chip>
                            <vs-chip v-if="data[indextr].estado == 2" color="warning"> Pendiente</vs-chip>
                        </vs-td>
                        <vs-td>
                            {{data[indextr].fecha_visita }}<br />
                            {{data[indextr].nombres }}
                            {{data[indextr].apellidos }}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].observacion }}
                        </vs-td>
                        <vs-td>
                            <vx-tooltip style="display: inline-block;" text="editar" position="top" color="warning">
                                <vs-button class="modal-default-button" size="small" color="warning" @click="agregarModal(data[indextr])" type="filled" icon-pack="feather" icon="icon-edit"> </vs-button>
                            </vx-tooltip> &nbsp;
                            <vx-tooltip style="display: inline-block;" text="editar" position="top" color="danger">
                                <vs-button class="modal-default-button" size="small" color="danger" @click="confirmarEliminar(data[indextr])" type="filled" icon-pack="feather" icon="icon-trash"> </vs-button>
                            </vx-tooltip>
                            <vx-tooltip style="display: inline-block;" text="Reporte individual" position="top" color="primary">
                                <vs-button class="modal-default-button ml-2" size="small" color="primary" @click="filtroReporteIndividual(data[indextr]);reporte=2;id=tr.idempresa" type="filled" icon-pack="feather" icon="icon-file"> </vs-button>
                            </vx-tooltip>
                        </vs-td>
                    </vs-tr>
                </template>
            </vs-table>
        </div>
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
import { createLogger } from 'vuex';
export default {
    components: {
        "v-select": vSelect,
        flatPickr,
        ReporteVisitas
    },
    data() {
        return {
            cedula: '',
            cedulaExiste: 0,
            user: [],
            misVisitas: [],
            modalVisitas: false,
            modalDetalles: false,
            visita: {
                'id': '',
                'fecha_visita': '',
                'estado': '',
                'observacion': '',
            },
            listaEmpresas: [],
            empresaSelect: '',
            configdateTimePicker: {
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
            },
            datoEliminar: '',
            datoEmpresa: {},
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
        if (me.user.cedula.length > 5) {
            me.cedulaExiste = 1
        }
        me.getEmpresas();
        me.getVisitas();
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
        agregarModal(item) {
            let me = this;
            // console.log(item)
            me.visita = {
                'id': '',
                'fecha_visita': '',
                'estado': '',
                'observacion': '',
            };
            if (item != null) {
                me.visita = item;
                me.empresaSelect = {
                    'id': item.idempresa,
                    'nombre': item.empresa
                }
            }
            me.modalVisitas = true;
        },
        getVisitas() {
            let me = this;
            me.$vs.loading()
            me.modalVisitas = false;
            if (me.user_admin) {
                this.$http.get(this.$server_url + "h_visitas")
                    .then(function (response) {
                        me.misVisitas = response.data
                        me.$vs.loading.close()
                    });                
            }
            if (me.user_visitas) {
                this.$http.get(this.$server_url + "visitasUser/"+me.user.idusuario)
                    .then(function (response) {
                        me.misVisitas = response.data
                        me.$vs.loading.close()
                    });                
            }
        },
        async getEmpresas() {
            let me = this;
            me.$vs.loading()
            this.$http.get(this.$server_url + "h_empresasActivas")
                .then(function (response) {
                    me.listaEmpresas = response.data
                    me.$vs.loading.close()
                });
        },
        filtroEmpresas(item) {
            let me = this;
            me.datoEmpresa = {};
            for (let index = 0; index < me.listaEmpresas.length; index++) {
                if (me.listaEmpresas[index].id == item) {
                    me.datoEmpresa = me.listaEmpresas[index];
                }
            }
            me.modalDetalles = true;
        },
        verificarDatos() {
            let me = this;
            if (me.empresaSelect == null || me.empresaSelect.nombre == null || me.empresaSelect.nombre == "") {
                me.$vs.notify({
                    text: "Seleccione la empresa",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.visita.fecha_visita == null || me.visita.fecha_visita == "") {
                me.$vs.notify({
                    text: "Seleccione la fecha",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.visita.estado == "") {
                me.$vs.notify({
                    text: "Seleccione el estado de la visita",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            me.$vs.loading()
            let formdata = new FormData();
            formdata.append('idempresa', me.empresaSelect.id);
            formdata.append('id', me.visita.id);
            formdata.append('fecha_visita', me.visita.fecha_visita);
            formdata.append('estado', me.visita.estado);
            formdata.append('observacion', me.visita.observacion);
            formdata.append('idusuario', me.user.idusuario);
            this.$http.post(this.$server_url + 'h_visitas', formdata)
                .then(function (res) {
                    me.getVisitas();
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
                text: 'Estas seguro de eliminar esta visita, esta acción no se podrá deshacer',
                acceptText: 'Aceptar',
                accept: me.eliminarVisita
            })
        },
        eliminarVisita() {
            let me = this;
            me.$vs.loading();
            this.$http.delete(this.$server_url + "h_visitas/" + me.datoEliminar.id)
                .then(function (res) {
                    // console.log(res.data)
                    me.$vs.notify({
                        text: "Visita eliminada correctamente",
                        color: 'danger',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    me.getVisitas();
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
            localStorage.setItem('quiruguica', "no")
            localStorage.setItem('tituloReporte', "Reporte General de visitas a empresas")
            me.status = "yes"
        },
        filtroReporteIndividual(tr) {
            let me = this;
            localStorage.setItem('ReportVisitas', '')
            localStorage.setItem('reporte', 'yes')
            localStorage.setItem('idempresa', tr.idempresa)
            localStorage.setItem('individual', "yes")
            localStorage.setItem('quiruguica', "no")
            localStorage.setItem('tituloReporte', `Reporte individual de visitas por estado de ${tr.empresa}`)
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
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate=" + from + '&toDate=' + to)
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
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate=" + from + '&toDate=' + to + '&id=' + me.id)
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
