<template>
<div class="vx-col md:w-full w-full mb-base">
    <vs-popup title="Médico" :active.sync="modalMedicos">
        <div class="vx-row">
            <div class="vx-col w-full" align="left">
                <label>Perfil</label>
                <v-select class="mb-4 w-full" v-model="UserSelectGrupo" :options="listaUsuariosAdd" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col w-full" align="left" v-if="UserSelectGrupo.id == fl_valor">
                <label>Especialidad</label>
                <v-select class="mb-4 w-full" v-model="especialidadSelect" :options="listaEspecialidades" label="nombre" placeholder="Seleccione..." />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Nombre" v-model="medico.nombres" maxlength="250" placeholder="Nombre del médico" />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Apellido" v-model="medico.apellidos" maxlength="250" placeholder="Apellido del médico" />
            </div>
            <div class="vx-col w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Direccion" v-model="medico.direccion" maxlength="250" placeholder="Direccion del consultorio del médico" />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Cédula" v-model="medico.cedula" maxlength="250" placeholder="Cédula del médico" />
            </div>
            <div class="vx-col sm:w-1/2  w-full" align="left">
                <vs-input type="email" class="inputx w-full mb-4" label="Email" v-model="medico.email" maxlength="250" placeholder="Email del médico" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Teléfono" v-model="medico.convencional" maxlength="50" placeholder="Teléfono convencional" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <vs-input type="text" class="inputx w-full mb-4" label="Celular" v-model="medico.movil" maxlength="50" placeholder="Celular" />
            </div>
            <div class="vx-col sm:w-1/2 w-full" align="left">
                <flat-pickr :config="configdateTimePicker" v-model="medico.fnacimiento" style="width: 210px; display: inline-block;" placeholder="Fecha nacimiento" class="m-2" />
            </div>
            <div class="vx-col sm:w-1/2 w-full">
                <label for="">Estado</label> <br />
                <vs-radio class="m-2" color="warning" v-model="medico.estado" vs-value="1">Activo</vs-radio>
                <vs-radio class="m-2" color="warning" v-model="medico.estado" vs-value="0">Inactivo</vs-radio>
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
            <vs-table stripe pagination max-items="30" search :data="listaMedicosTmp">
                <template slot="header">
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2">
                            <p class="mt-4"> Cantidad: {{listaMedicosTmp.length}}</p>
                        </div>
                        <div class="vx-col sm:w-1/2">
                            <vs-radio class="m-2" color="warning" @change="filtroUsuarios(0)" v-model="fl_valor" vs-value="0">Todos</vs-radio>
                            <vs-radio class="m-2" color="warning" @change="filtroUsuarios(3)" v-model="fl_valor" vs-value="3">Medicos</vs-radio>
                        </div>
                    </div>
                </template>
                <template slot="thead">
                    <vs-th style="max-width: 20px;">#</vs-th>
                    <vs-th>Nombre</vs-th>
                    <vs-th>Teléfono</vs-th>
                    <vs-th>Fecha nacimiento</vs-th>
                    <vs-th>Especialidad</vs-th>
                    <vs-th>Acciones</vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            {{indextr+1}}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].nombres }}
                            {{data[indextr].apellidos }} <br />
                            {{data[indextr].cedula }} <br />
                            {{data[indextr].email }}<br />
                            {{data[indextr].grupo_nombre }}<br />
                            <vs-chip v-if="data[indextr].estado == 0" color="danger">Inactivo</vs-chip>
                            <vs-chip v-if="data[indextr].estado == 1" color="success">Activo</vs-chip>
                        </vs-td>
                        <vs-td>
                            {{data[indextr].convencional }}<br />
                            {{data[indextr].movil }}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].fnacimiento }}
                        </vs-td>
                        <vs-td>
                            {{data[indextr].especialidad }}
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    components: {
        'v-select': vSelect,
        flatPickr,
    },
    data() {
        return {
            listaMedicos: [],
            listaMedicosTmp: [],
            listaEspecialidades: [],
            especialidadSelect: '',
            modalMedicos: false,
            medico: {
                'idusuario': '',
                'nombres': '',
                'apellidos': '',
                'cedula': '',
                'email': '',
                'estado': '',
                'convencional': '',
                'movil': '',
                'fnacimiento': '',
                'direccion': '',
            },
            configdateTimePicker: {
                enableTime: true,
                dateFormat: 'Y-m-d'
            },
            grupo_medico: 3,
            datoEliminar: '',
            listaUsuariosAdd: [],
            UserSelectGrupo: '',
            fl_valor: 3,
        }
    },
    mounted() {
        let me = this;
        me.getMedicos();
        me.getEspecialidades();
        me.getGrupos();

    },
    methods: {
        filtroUsuarios(item) {
            let me = this;
            me.fl_valor = item != null ? item : me.fl_valor
            // console.log(me.fl_valor)
            me.listaMedicosTmp = [];
            for (let index = 0; index < me.listaMedicos.length; index++) {
                if (me.listaMedicos[index].grupo_id == me.fl_valor) {
                    me.listaMedicosTmp.push(me.listaMedicos[index])
                }
            }
            if (item == 0) {
                me.listaMedicosTmp = me.listaMedicos;
            }
        },
        async getEspecialidades() {
            let me = this;
            me.$vs.loading();
            me.modalEspec = false;
            this.$http.get(this.$server_url + "h_especialidades")
                .then(function (response) {
                    me.listaEspecialidades = response.data
                    me.$vs.loading.close()
                });
        },
        async getGrupos() {
            let me = this;
            me.$vs.loading();
            this.$http.get(this.$server_url + "grupos")
                .then(function (response) {
                    me.listaUsuariosAdd = response.data
                    // console.log(response.data)
                    me.$vs.loading.close()
                });
        },
        agregarModal(item) {
            let me = this;
            // console.log(item)
            me.medico = {
                'idusuario': '',
                'nombres': '',
                'apellidos': '',
                'cedula': '',
                'email': '',
                'estado': '',
                'convencional': '',
                'movil': '',
                'fnacimiento': '',
                'direccion': '',
            };
            if (item != null) {
                me.medico = item;
                me.medico.nombres = item.nombres != null ? item.nombres : ''
                me.medico.apellidos = item.apellidos != null ? item.apellidos : ''
                me.medico.cedula = item.cedula != null ? item.cedula : ''
                me.medico.email = item.email != null ? item.email : ''
                me.medico.convencional = item.convencional != null ? item.convencional : ''
                me.medico.movil = item.movil != null ? item.movil : ''
                me.medico.fnacimiento = item.fnacimiento != null ? item.fnacimiento : ''
                me.medico.direccion = item.direccion != null ? item.direccion : ''
                me.especialidadSelect = {
                    'id': item.idespecialidad,
                    'nombre': item.especialidad
                }
                me.UserSelectGrupo = {
                    'id': item.grupo_id,
                    'nombre': item.grupo_nombre,
                }
            }
            me.modalMedicos = true;
        },
        getMedicos() {
            let me = this;
            me.$vs.loading();
            me.modalMedicos = false;
            this.$http.get(this.$server_url + "h_medicos")
                .then(function (response) {
                    me.listaMedicos = response.data
                    me.listaMedicosTmp = response.data
                    me.filtroUsuarios();
                    // console.log(response.data)
                    me.$vs.loading.close()
                });
        },
        verificarDatos() {
            let me = this;
                
            if (me.UserSelectGrupo.id == me.grupo_medico) {
                if (me.especialidadSelect == null || me.especialidadSelect.id == null || me.especialidadSelect.nombre == "" || me.especialidadSelect == "") {
                    me.$vs.notify({
                        text: "Seleccione una especialidad",
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    return
                }
            }
            if (me.medico.nombres == null || me.medico.nombres == "") {
                me.$vs.notify({
                    text: "Ingrese el nombre del médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.medico.apellidos == null || me.medico.apellidos == "") {
                me.$vs.notify({
                    text: "Ingrese el apellido del médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.medico.cedula == null || me.medico.cedula == "") {
                me.$vs.notify({
                    text: "Ingrese la cedula del médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.medico.email == null || me.medico.email == "") {
                me.$vs.notify({
                    text: "Ingrese el email del médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            if (me.medico.estado == null || me.medico.estado == "") {
                me.$vs.notify({
                    text: "Seleccione el estado del médico",
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-alert-triangle',
                })
                return
            }
            // return
            me.$vs.loading()
            let formdata = new FormData();
            if (me.especialidadSelect.id == null) {
                me.especialidadSelect.id = 0;
            }
            formdata.append('idespecialidad', me.especialidadSelect.id);
            formdata.append('idusuario', me.medico.idusuario);
            formdata.append('nombres', me.medico.nombres);
            formdata.append('apellidos', me.medico.apellidos);
            formdata.append('cedula', me.medico.cedula);
            formdata.append('email', me.medico.email);
            formdata.append('fnacimiento', me.medico.fnacimiento);
            formdata.append('direccion', me.medico.direccion);
            formdata.append('convencional', me.medico.convencional);
            formdata.append('movil', me.medico.movil);
            formdata.append('estado', me.medico.estado);
            formdata.append('id_group', me.UserSelectGrupo.id);
            this.$http.post(this.$server_url + 'h_medicos', formdata)
                .then(function (res) {
                    console.log(res.data )
                    me.getMedicos();
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
            // console.log(item)
            me.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: 'Confirmación',
                text: 'Estas seguro de eliminar este usuario, esta acción no se podrá deshacer',
                acceptText: 'Aceptar',
                accept: me.eliminarVisita
            })
        },
        eliminarVisita() {
            let me = this;
            me.$vs.loading();
            this.$http.delete(this.$server_url + "h_medicos/" + me.datoEliminar.id)
                .then(function (res) {
                    // console.log(res.data)
                    me.$vs.notify({
                        text: "Médico desactivado correctamente",
                        color: 'danger',
                        iconPack: 'feather',
                        icon: 'icon-alert-triangle',
                    })
                    me.getMedicos();
                    me.$vs.loading.close();
                });
        }
    }
}
</script>
