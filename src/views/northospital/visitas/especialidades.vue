<template>
<div>
    <vs-popup title="Especialidades" :active.sync="modalEspec">
        <div class="vx-row mt-2">
            <div class="vx-col  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Especialidad" v-model="especialidad.nombre" maxlength="250" placeholder="Nombre de la especialidad médica" />
            </div>
            <div class="vx-col sm:w-1/2 w-full">
                <label for="">Estado</label> <br />
                <vs-radio class="m-2" color="warning" v-model="especialidad.estado" vs-value="1">Activa</vs-radio>
                <vs-radio class="m-2" color="warning" v-model="especialidad.estado" vs-value="0">Inactiva</vs-radio>
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
            <vs-table stripe pagination max-items="30" search :data="listaDatos">
                <template slot="header">
                    <p>Cantidad: {{listaDatos.length}} </p>
                </template>
                <template slot="thead">
                    <vs-th style="max-width: 20px;">#</vs-th>
                    <vs-th>Nombre</vs-th>
                    <vs-th>Estado</vs-th>
                    <vs-th>Acciones</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            {{indextr+1}}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].nombre }}
                        </vs-td>
                        <vs-td>
                            <vs-chip v-if="data[indextr].estado == 0" color="danger">Inactiva</vs-chip>
                            <vs-chip v-if="data[indextr].estado == 1" color="success">Activa</vs-chip>
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
import vSelect from 'vue-select';
export default {
    components: {
        'v-select': vSelect,
    },
    data() {
        return {
            modalEspec: false,
            listaDatos: '',
            especialidad: {
                'id': '',
                'nombre': '',
                'estado': '',
            },
        }
    },
    mounted() {
        let me = this;
        me.getEspecialidades();
    },
    methods: {
        getEspecialidades() {
            let me = this;
            me.$vs.loading();
            me.modalEspec = false;
            this.$http.get(this.$server_url + "h_especialidades")
                .then(function (response) {
                    me.listaDatos = response.data
                    me.$vs.loading.close()
                });
        },
        agregarModal(item) {
            let me = this;
            me.especialidad = {
                'id': '',
                'nombre': '',
                'estado': '',
            };
            if (item != null) {
                me.especialidad = item;
            };
            me.modalEspec = true;
        },
        verificarDatos() {
            let me = this;
            if (me.especialidad.nombre == "") {
                me.$vs.notify({
                    text: "Ingresa un nombre para la especialdiad",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.especialidad.estado == "") {
                me.$vs.notify({
                    text: "Selecciona el estado la especialdiad",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            me.$vs.loading.close()
            this.$http.post(this.$server_url + 'h_especialidades', me.especialidad)
                .then(function (res) {
                    me.getEspecialidades();
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
                text: 'Estas seguro de eliminar esta especialidad, esta acción no se podrá deshacer',
                acceptText: 'Aceptar',
                accept: me.eliminarEspecialidad
            })
        },
        eliminarEspecialidad() {
            let me = this;
            me.$vs.loading();
            this.$http.delete(this.$server_url + "h_especialidades/" + me.datoEliminar.id)
                .then(function (res) {
                    me.$vs.notify({
                        text: "Especialidad eliminada correctamente",
                        color: 'danger',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    me.getEspecialidades();
                    me.$vs.loading.close();
                });
        }
    }
}
</script>
