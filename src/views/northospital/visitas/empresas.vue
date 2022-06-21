<template>
<div class="vx-col md:w-full w-full mb-base">
    <vs-popup :title="titulo" :active.sync="modalEmpresa">
        <div class="vx-row mt-2">
            <div class="vx-col w-full" align="left">
                <label>Ciudad</label>
                <v-select class="mb-4 w-full" v-model="ciudadSelect" :options="ciudad" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Empresa" v-model="empresa.nombre" maxlength="250" placeholder="Nombre de la nueva empresa" />
            </div>
            <div class="vx-col  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Dirección" v-model="empresa.direccion" maxlength="250" placeholder="Direccion de la nueva empresa" />
            </div>
            <div class="vx-col w-full" align="left">
                <label>Tipos</label>
                <v-select class="mb-4 w-full" v-model="tipoSelect" :options="tipo" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Encargado" v-model="empresa.encargado" maxlength="250" placeholder="Encargado de la empresa" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Teléfono" v-model="empresa.convencional" maxlength="50" placeholder="Teléfono convencional" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Celular" v-model="empresa.movil" maxlength="50" placeholder="Celular" />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="number" class="inputx w-full mb-4" label="Trabajadores" v-model="empresa.num_trabajadores" placeholder="Cantidad trabajadores" />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Email" v-model="empresa.email" maxlength="150" placeholder="Email" />
            </div>
            
            <div class="vx-col w-full" align="left">
                <vs-textarea type="text" class="inputx w-full mb-4" label="Observacion" v-model="empresa.observacion" maxlength="250" />
            </div>
            <div class="vx-col sm:w-1/2 w-full">
                <label for="">Tipo de seguro</label> <br />
                <vs-radio class="m-2" color="warning" v-model="empresa.tipo_seguro" vs-value="privado">Privado</vs-radio>
                <vs-radio class="m-2" color="warning" v-model="empresa.tipo_seguro" vs-value="iess">Público</vs-radio>
            </div>
            <div class="vx-col sm:w-1/2 w-full">
                <label for="">Estado</label> <br />
                <vs-radio class="m-1" color="success" v-model="empresa.estado" vs-value="1">Activa</vs-radio>
                <vs-radio class="m-1" color="danger" v-model="empresa.estado" vs-value="0">Inactiva</vs-radio>
            </div>
            <div class="vx-col w-full mt-4">
                <vs-button icon-pack="feather" icon="icon-plus" class="mr-2" color="success" @click="verificarDatos()">Guardar</vs-button>
            </div>
        </div>
    </vs-popup>
    <vx-card>
        <div class="vx-col w-full mt-2">
            <vs-button icon-pack="feather" icon="icon-plus" class="mr-2" color="primary" @click="agregarModal()">Agregar</vs-button>
        </div>
        <div>
            <vs-table stripe pagination max-items="30" search :data="listaEmpresas">
                <template slot="header">
                    <p>Cantidad: {{listaEmpresas.length}} </p>
                </template>
                <template slot="thead">
                    <vs-th style="max-width: 20px;">#</vs-th>
                    <vs-th>Empresa</vs-th>
                    <vs-th>Encargado</vs-th>
                    <vs-th>Seguro</vs-th>
                    <vs-th>Tipo</vs-th>
                    <vs-th>Observacion</vs-th>
                    <vs-th>Acciones</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            {{indextr+1}}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].nombre }} <br />
                            <small>{{data[indextr].direccion }} </small> <br />
                            <vs-chip color="success" v-if="data[indextr].estado == 1">Activa</vs-chip>
                            <vs-chip color="danger" v-if="data[indextr].estado == 0">Inactiva</vs-chip>
                        </vs-td>
                        <vs-td>
                            {{data[indextr].encargado }} <br />
                            {{data[indextr].convencional }} <br />
                            {{data[indextr].movil }}<br />
                            {{data[indextr].email }}<br />
                            {{data[indextr].nombre_ciudad }}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].tipo_seguro }}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].tipoNombre }}
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
export default {
    components: {
        'v-select': vSelect,
    },
    data() {
        return {
            modalEmpresa: false,
            titulo: 'Agregar empresa',
            empresa: {
                'id': '',
                'nombre': '',
                'direccion': '',
                'convencional': '',
                'movil': '',
                'email': '',
                'observacion': '',
                'estado': '',
                'encargado': '',
                'tipo_seguro': '',
                'num_trabajadores': '',
                'sector': '',
            },
            ciudad: [],
            ciudadSelect: '',
            tipo: [],
            tipoSelect: '',
            listaEmpresas: '',
            editar: false,
            datoEliminar: '',
        }
    },
    mounted() {
        let me = this;
        me.getCiudadSelect();
        me.getEmpresas();
        me.getTipos();
    },
    methods: {
        agregarModal(item) {
            let me = this;
            // console.log(item)
            me.empresa = {
                    'id': '',
                    'nombre': '',
                    'direccion': '',
                    'convencional': '',
                    'movil': '',
                    'email': '',
                    'observacion': '',
                    'estado': '',
                    'encargado': '',
                    'tipo_seguro': '',
                    'num_trabajadores': '',
                    'sector': '',
                },
                me.ciudadSelect = {};
                me.tipoSelect = {};
            if (item != null) {
                //para no guardar valores nulos
                me.empresa.id = item.id
                me.empresa.nombre = item.nombre
                me.empresa.estado = item.estado
                me.empresa.direccion = item.direccion != null ? item.direccion : ''
                me.empresa.convencional = item.convencional != null ? item.convencional : ''
                me.empresa.movil = item.movil != null ? item.movil : ''
                me.empresa.email = item.email != null ? item.email : ''
                me.empresa.observacion = item.observacion != null ? item.observacion : ''
                me.empresa.encargado = item.encargado != null ? item.encargado : ''
                me.empresa.tipo_seguro = item.tipo_seguro != null ? item.tipo_seguro : ''
                me.empresa.num_trabajadores = item.num_trabajadores != null ? item.num_trabajadores : ''
                me.ciudadSelect.idciudad = item.ciudad
                me.ciudadSelect.nombre = item.nombre_ciudad
                me.tipoSelect ={
                    'id':item.tipoId,
                    'nombre':item.tipoNombre
                }
            }
            me.modalEmpresa = true;
        },
        getEmpresas() {
            let me = this;
            me.$vs.loading()
            me.modalEmpresa = false;
            this.$http.get(this.$server_url + "h_empresas").
            then(function (response) {
                me.listaEmpresas = response.data
                me.$vs.loading.close()
            });
        },
        async getCiudadSelect() {
            let me = this;
            this.$http.get(this.$server_url + "ciudad").
            then(function (response) {
                me.ciudad = response.data
                // console.log(me.ciudad)
            });
        },
        async getTipos() {
            let me = this;
            this.$http.get(this.$server_url + "t_activos").
            then(function (response) {
                me.tipo = response.data
                // console.log(me.tipo)
            });
        },
        verificarDatos() {
            let me = this;
            if (me.ciudadSelect == "" || me.ciudadSelect == null) {
                me.$vs.notify({
                    text: "Seleccione la ciudad",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.tipoSelect == "" || me.tipoSelect == null || me.tipoSelect.nombre == "" || me.tipoSelect.nombre == null) {
                me.$vs.notify({
                    text: "Seleccione el tipo",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.empresa.nombre == undefined || me.empresa.nombre == "") {
                me.$vs.notify({
                    text: "Ingrese un nombre de la empresa",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.empresa.estado == undefined || me.empresa.estado == "") {
                me.$vs.notify({
                    text: "Seleccione el estado la empresa",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            // console.log(me.empresa)
            // return
            me.$vs.loading()
            let formdata = new FormData();
            formdata.append('ciudad', me.ciudadSelect.idciudad);
            formdata.append('id', me.empresa.id);
            formdata.append('nombre', me.empresa.nombre);
            formdata.append('direccion', me.empresa.direccion);
            formdata.append('convencional', me.empresa.convencional);
            formdata.append('movil', me.empresa.movil);
            formdata.append('email', me.empresa.email);
            formdata.append('observacion', me.empresa.observacion);
            formdata.append('estado', me.empresa.estado);
            formdata.append('encargado', me.empresa.encargado);
            formdata.append('tipo_seguro', me.empresa.tipo_seguro);
            formdata.append('num_trabajadores', me.empresa.num_trabajadores);
            formdata.append('tipo_id', me.tipoSelect.id);
            this.$http.post(this.$server_url + 'h_empresas', formdata)
                .then(function (res) {
                    me.getEmpresas();
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
            me.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmación',
                text: 'Estas seguro de eliminar esta empresa, esta acción no se podrá deshacer',
                acceptText: 'Aceptar',
                accept: me.eliminarEmpresa
            })
        },
        eliminarEmpresa() {
            let me = this;
            me.$vs.loading();
            this.$http.delete(this.$server_url + "h_empresas/" + me.datoEliminar.id)
                .then(function (res) {
                    me.$vs.notify({
                        text: "Empresa eliminada correctamente",
                        color: 'danger',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    me.getEmpresas();
                    me.$vs.loading.close();
                });
        }
    }
}
</script>
