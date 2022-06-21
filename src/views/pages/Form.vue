<template>
  <div
    class="
      w-full
      sm:w-full
      h-screen
      md:w-full
      lg:w-1/3
      d-theme-dark-bg
      rounded-3xl
      sm:rounded-none
      shadow-2xl
    "
  >
    <div class="h-screen flex item-center">
      <div class="px-8 py-24 mx-auto grid grid-cols-1 content-around">
        <div class="text-center flex justify-center">
          <img
            src="@/assets/images/northospital.png"
            alt="login"
            class="md:w-2/5 lg:w-3/4 sm:w-2/5 w-3/4 text-center"
          />
        </div>
        <div>
          <div class="vx-card__title">
            <h1 class="title font-bold text-4xl text-center">Bienvenidos</h1>
          </div>
          <FormulateForm
            name="loginform"
            class="mt-6"
            @submit="registerHandler"
            :values="user"
          >
            <div class="container-input">
              <FormulateInput
                type="text"
                v-model="user.email"
                name="name"
                autocomplete="no"
                label="Usuario"
                validation="required|email"
                error-behavior="blur"
                :validation-messages="{
                  required: `Ingrese un usuario válido`,
                  email: `${user.email} no es una dirección de correo electrónico válida`,
                }"
              />
              <FormulateInput
                class="mt-6"
                type="password"
                v-on:keyup.enter="ingresarSistema()"
                v-model="user.password"
                name="name"
                autocomplete="no"
                label="Contraseña"
                validation="required"
                error-behavior="blur"
                :validation-messages="{
                  required: `Ingrese una contraseña válida`,
                }"
              />
            </div>
          </FormulateForm>
          <div class="text-right p-3">
            <router-link to="/restaurar">Olvidé mi contraseña</router-link>
          </div>
        </div>
        <div>
          <div class="flex flex-wrap justify-between">
            <vs-button
              class="w-full rounded-2xl mx-auto font-bold uppercase"
              size="large"
              type="relief"
              color="primary"
              @click="ingresarSistema()"
              >Iniciar sesión</vs-button
            >
          </div>
          <div class="flex flex-wrap justify-between mt-4">
            <vs-button
              class="w-full rounded-2xl mx-auto font-bold uppercase"
              size="large"
              type="relief"
              color="primary"
              @click="register()"
              >Registro</vs-button
            >
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.$emit("status", false);
    },
    ingresarSistema() {
      this.$formulate.submit("loginform");
    },
    async registerHandler() {
      let me = this;
      if (me.user.email == "" || me.user.password == "") {
        me.$vs.notify({
          text: "Por favor llene los campos",
          color: "primary",
          iconPack: "feather",
          icon: "icon-check",
        });
        return;
      }
      let formData = new FormData();
      formData.append("email", me.user.email);
      formData.append("cedula", me.user.password);
      formData.append("login", "yes");
      await this.$http.get(this.$server_url + 'sanctum/csrf-cookie');
      this.$http
        .post(this.$server_url + "hospitalnorte", formData)
        .then((res) => {
          if (res.data.status == "1") {
            me.$vs.notify({
              text: res.data.message,
              color: "success",
              iconPack: "feather",
              icon: "icon-check",
            });
            me.usuarioHospital = res.data.usuario[0];
            localStorage.setItem("usuario", JSON.stringify(me.usuarioHospital));
            this.$router.push("/northospital/home");
            // location.reload();
          } else {
            me.$vs.notify({
              text: "Credenciales incorrectas",
              color: "warning",
              iconPack: "feather",
              icon: "icon-check",
            });
          }
        })
        .catch(function (e) {
          me.$vs.notify({
            text: "Ocurrio un error al user",
            color: "warning",
            iconPack: "feather",
            icon: "icon-check",
          });
        });
    },
  },
};
</script>

<style lang="css">
::v-deep .formulate-form {
}

input {
  width: 100%;
  height: 40px;
  border: 2px solid #243890;
  border-radius: 15px;
  padding: 8px;
  background: white;
}

.formulate-input-error {
  padding: 8px;
  color: red !important;
}

.formulate-input-label {
  color: #243890;
  padding: 8px !important;
}
</style>
