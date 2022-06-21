<template>
<div class="w-full sm:w-full h-screen md:w-full lg:w-1/3 d-theme-dark-bg rounded-3xl sm:rounded-none shadow-2xl">
    <div class="h-screen flex item-center">
        <div class="px-8 py-12 mx-auto grid grid-cols-1 content-around">
            <div class="flex justify-end">
                <vs-button radius color="dark" type="flat" size="large" icon-pack="feather" icon="icon-arrow-left" @click="login()" class=""></vs-button>
            </div>
            <div class="text-center flex justify-center">
                <img src="@/assets/images/northospital.png" alt="login" class="md:w-2/5 lg:w-3/4 sm:w-2/5 w-3/4 text-center">
            </div>
            <div class="vx-card__title">
                <h1 class="title font-bold text-4xl text-center">Registrate</h1>
            </div>
            <FormulateForm name="registerform" class="mt-2" @submit="registerHandler" :values="user">
                <div class="container-input">
                    <FormulateInput type="text" v-model="user.nombres" name="name" autocomplete="no" label="Ingrese sus nombres" validation="required" error-behavior="blur" :validation-messages="{
                  required: `El campo nombres es requerido`,
                }" />
                    <FormulateInput class="mt-2" type="text" v-model="user.apellidos" name="name" autocomplete="no" label="Ingrese sus apellidos" validation="required" error-behavior="blur" :validation-messages="{
                  required: `El campo apellidos es requerido`,
                }" />
                    <FormulateInput class="mt-2" type="text" v-model="user.cedula" name="name" autocomplete="no" label="Ingrese su número de cédula" validation="required" error-behavior="blur" :validation-messages="{
                  required: `El campo cédula es requerido`,
                }" />
                    <FormulateInput class="mt-2" type="text" v-model="user.email" name="name" autocomplete="no" label="Ingrese su correo electrónico" validation="required|email" error-behavior="blur" :validation-messages="{
                  required: `El campo correo es requerido`,
                  email: `${user.email} no es una dirección de correo electrónico válida`
                }" />
                    <div class="flex justify-around m-6">
                        <vs-radio v-model="user.id_group" class="text-primary" vs-name="radios1" vs-value="18">Usuario publicidad</vs-radio>
                        <vs-radio v-model="user.id_group" class="text-primary" vs-name="radios1" vs-value="19">Usuario para visitas</vs-radio>
                    </div>
                </div>
            </FormulateForm>
            <div>
                <div class="flex flex-wrap justify-between mt-2">
                    <vs-button class="w-full rounded-2xl mx-auto font-bold uppercase" size="large" type="relief" color="primary" @click="guardar">Guardar</vs-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
Vue.use(VueFormulate);
export default {
    data() {
        return {
            user: {
                nombre: '',
                apellidos: '',
                cedula: '',
                email: '',
                id_group: ''
            }
        }
    },
    methods: {
        login() {
            this.$emit("status", true)
        },
        guardar() {
            this.$formulate.submit('registerform');
        },
        async registerHandler() {
            let me = this
            if (me.user.nombres == "" || me.user.apellidos == "" || me.user.cedula == "" || me.user.email == "") {
                me.$vs.notify({
                    text: 'Por favor llene los campos',
                    color: 'primary',
                    iconPack: 'feather',
                    icon: 'icon-check'
                })
                return false
            }
            let formData = new FormData();
            formData.append('nombres', me.user.nombres);
            formData.append('apellidos', me.user.apellidos);
            formData.append('email', me.user.email);
            formData.append('cedula', me.user.cedula);
            formData.append('id_group', me.user.id_group)
            formData.append('registro', 'yes');
            await this.$http.get(this.$server_url + 'sanctum/csrf-cookie');
            this.$http.post(this.$server_url + 'hospitalnorte', formData)
                .then(res => {
                    me.$vs.notify({
                        text: res.data.message,
                        color: 'success',
                        iconPack: 'feather',
                        icon: 'icon-check'
                    })
                    console.log('prueba', res.data.usuario)
                    if (res.data.status == '1') {
                        me.usuarioHospital = res.data.usuario
                        localStorage.setItem('usuario', JSON.stringify(me.usuarioHospital));
                        this.$router.push("/northospital/home");
                        // location.reload();
                    }
                })
                .catch(function (error) {
                    console.log('error', error.response)
                    if (error.response.status == 422) {
                        try {
                            me.$vs.notify({
                                text: error.response.data.errors.cedula[0],
                                color: 'warning',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                time: 8000
                            })
                        } catch (error) {}
                        try {
                            me.$vs.notify({
                                text: error.response.data.errors.email[0],
                                color: 'warning',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                time: 8000
                            })
                        } catch (error) {}
                    }
                })
        },
    },
}
</script>
