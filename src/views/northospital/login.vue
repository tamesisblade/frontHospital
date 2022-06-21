<template>
    <div style="background-color: #D3EAFE;height: 100vh;">
        <div>
            <vs-row>
                <vs-col vs-type="flex" vs-offset="3" class="fondo prueba" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="12" vs-xs="12" :style="'linear-gradient(rgba(0,0,0,0.2),rgba(0.0.0.0.2));'+'background-image:'+cssProps.backgroundImage+' min-height: 500px;margin-top:90px;'">
                    <div class="container-h p-5">
                        <h1 class="text-white">Noth Hospital</h1>
                        <vs-divider></vs-divider>
                        <vs-list>
                            <vs-list-header class="text-white" style="font-weight:300" icon="supervisor_account" title="Cuidamos a tu familia"></vs-list-header>
                            <vs-list-header class="text-white" style="font-weight:300" icon="spa" title="Atencion rapida" color="success"></vs-list-header>
                            <vs-list-header class="text-white" style="font-weight:300" icon="content_paste" title="Resultado rapidos" color="success"></vs-list-header>
                        </vs-list>
                    </div>
                </vs-col>
                <vs-col v-if="login == true"  vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" class="hlogin">
                    <div style="width: 90%;">
                        <h1 class="text-white">Login</h1>
                        <vs-divider></vs-divider>
                        <vs-input label="Email" class="w-full" placeholder="Ingrese su email" v-model="ingresar.email"/>
                        <vs-input type="password" class="w-full" label="Password" placeholder="Ingrese su password" v-model="ingresar.password"/>
                        <div class="flex">
                            <vs-button type="relief" @click="ingresarSistema()" class="mt-4">Ingresar</vs-button>
                            <vs-button type="relief" @click="login = false" color="success" class="mt-4 ml-2">Registro</vs-button>
                        </div>
                    </div>
                </vs-col>
                <vs-col v-else vs-type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="12" vs-xs="12" class="hlogin">
                    <div style="width: 90%;">
                        <h1 class="text-white">Registro</h1>
                        <vs-divider></vs-divider>
                        <vs-input label="Nombres" class="w-full" placeholder="Ingrese su nombre" v-model="ingresar.nombres"/>
                        <vs-input label="Apellidos" class="w-full" placeholder="Ingrese su email" v-model="ingresar.apellidos"/>
                        <vs-input label="Cedula"  class="w-full" placeholder="Ingrese su cedula" v-model="ingresar.cedula"/>
                        <p style="color:red;font-size:10px;">{{cedulaVerificar}}</p>
                        <vs-input type="email" label="Email" class="w-full" placeholder="Ingrese su email" v-model="ingresar.email"/>
                        <ul class="flex mt-3">
                            <li>
                            <vs-radio v-model="ingresar.id_group" class="text-white" vs-name="radios1" vs-value="18">Usuario publicidad</vs-radio>
                            </li>
                            <li>
                            <vs-radio v-model="ingresar.id_group" class="text-white ml-3" vs-name="radios1" vs-value="19">Usuario para visitas</vs-radio>
                            </li>
                        </ul>
                        <div class="flex">
                            <vs-button type="relief" @click="guardar(ingresar)" color="success" class="mt-4">Registrarse</vs-button>
                            <vs-button type="relief"  @click="login = true" class="mt-4 ml-2">Login</vs-button>   
                        </div>
                    </div>
                </vs-col>
            </vs-row>
        </div>
    </div>
</template>
<script type="text/javascript">
</script>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from 'vue'
import axios from 'axios'
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
Vue.use(axios)
Vue.component("v-select", vSelect);
export default {
  data() {
    return {
        mensajeEnviar:'Enviar',
        cedulaExiste:1,
        estadoInstitucion:'0',
        documento:"",
        cedulaVerificar:"",
        errors: {
            cedula: '',
            nombres: '',
            apellidos: '',
            email: '',
            // password: '',
            paralelo: '',
            grado: '',
        },
        ciudad: [],
        institucion: [],
        instituciones: [],
        idregion: '',
        idciudad: '',
        estudiante: {
            cedula: '',
            nombres: '',
            apellidos: '',
            email: '',
            idinstitucion: '',
            // password: '',
            paralelo: '',
            grado: '',
        },
        linkEvaluacion: '',
        vectorLink: '',
        registroEvaluacion: false,
        numero:'',
        validacionCedula:false,
        seminarios:[],
        tipoWebinar:'1',
        usuarioGet:[],
        login:true,
        usuarioHospital:[],
        ingresar:{
            nombres:'',
            apellidos:'',
            email:'',
            cedula:'',
            password:'',
            id_group:'18',
        },
        cssProps:{
            backgroundImage: `url(${require('@/assets/northHospital/login/fondo.png')});`
        },
        usuario:[]
    }
  },
  mounted() {
        let me = this;
        me.usuario = JSON.parse(localStorage.getItem("usuario"))
        me.getSeminarios();
        this.linkEvaluacion = localStorage.getItem('evaluacionxLink')
        if (me.usuario.cedula >5) {
            this.$router.push('/northospital/home');
        } else {}
    },
        methods: {
      
        guardar() { 
            let me = this
            if(me.ingresar.nombres == "" ||  me.ingresar.apellidos == "" || me.ingresar.cedula == "" || me.ingresar.email == ""){
                me.$vs.notify({
                text:'Por favor llene los campos',
                color:'primary',
                iconPack: 'feather',
                icon:'icon-check'})
                return false
            }
            let formData = new FormData();
            formData.append('nombres',me.ingresar.nombres);
            formData.append('apellidos',me.ingresar.apellidos);
            formData.append('email',me.ingresar.email);
            formData.append('cedula',me.ingresar.cedula);
            formData.append('id_group',me.ingresar.id_group)
            formData.append('registro','yes');
            this.$http.post(this.$server_url+'hospitalnorte', formData)
            .then(res => {
                me.$vs.notify({
                text:res.data.message,
                color:'success',
                iconPack: 'feather',
                icon:'icon-check'})
                console.log('prueba',res.data.usuario)
                if(res.data.status == '1'){
                    me.usuarioHospital = res.data.usuario
                    localStorage.setItem('usuario', JSON.stringify(me.usuarioHospital));
                    this.$router.push("/northospital/home");
                    // location.reload();
                }
            })
            .catch(function(error){
                console.log('error',error.response)
                if (error.response.status == 422) {
                    try {
                        me.$vs.notify({
                                text: error.response.data.errors.cedula[0] ,
                                color: 'warning',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                time:8000
                        })     
                    } catch (error) {
                    }
                    try {
                        me.$vs.notify({
                                text: error.response.data.errors.email[0] ,
                                color: 'warning',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                time:8000
                        })  
                    } catch (error) {
                    }
                }
            })          
        },
        ingresarSistema() { 
            let me = this
            if(me.ingresar.email == "" || me.ingresar.password == ""){
                me.$vs.notify({
                text:'Por favor llene los campos',
                color:'primary',
                iconPack: 'feather',
                icon:'icon-check'})
                return 
            }
            let formData = new FormData();
            formData.append('email',me.ingresar.email);
            formData.append('cedula',me.ingresar.password);
            formData.append('login','yes');
            this.$http.post(this.$server_url+'hospitalnorte', formData)
            .then(res => {
                if(res.data.status == '1'){
                    me.$vs.notify({
                    text:res.data.message,
                    color:'success',
                    iconPack: 'feather',
                    icon:'icon-check'})
                    me.usuarioHospital = res.data.usuario[0]
                    localStorage.setItem('usuario', JSON.stringify(me.usuarioHospital));
                    this.$router.push("/northospital/home");
                    // location.reload();
                }else{
                    me.$vs.notify({
                    text:'Credenciales incorrectas',
                    color:'warning',
                    iconPack: 'feather',
                    icon:'icon-check'})
                }
            })
            .catch(function(e){
                me.$vs.notify({
                text:'Ocurrio un error al ingresar',
                color:'warning',
                iconPack: 'feather',
                icon:'icon-check'})
            })
           
        },
        limpiar(){
            let me = this;
            me.ingresar.nombres = ""
            me.ingresar.apellidos = ""
            me.ingresar.cedula = ""
            me.ingresar.email = ""
            me.ingresar.password = ""
        },

        getSeminarios() {
            let me = this;
            me.seminarios = []
            //para traer los webinars
            if(me.tipoWebinar == 1){
                this.$http.get(this.$server_url+'obtenerWebinars')
                .then(function (res) {
                    me.$vs.loading.close()
                    me.seminarios = res.data
                })
                .catch(function (error) {  
                })
            //para traer las capacitaciones
            }else{
                this.$http.get(this.$server_url+'obtenerWebinars?capacitaciones=yes')
                .then(function (res) {
                    me.$vs.loading.close()
                    me.seminarios = res.data
                })
                .catch(function (error) {
                })
            } 
        },
        //VALIDACION CEDULA
        validarDocumento () {          
            let me = this;
            me.numero = me.ingresar.cedula;
            var suma = 0;      
            var residuo = 0;      
            var pri = false;      
            var pub = false;            
            var nat = false;      
            var numeroProvincias = 22;                  
            var modulo = 11;
            var d1 = null;
            var d2 = null;
            var d3 = null;
            var d4 = null;
            var d5 = null;
            var d6 = null;
            var d7 = null;
            var d8 = null;
            var d9 = null;
            var d10 = null;      
            var    p1 = null;
            var    p2 = null;
            var    p3 = null;
            var    p4 = null;
            var    p5 = null;
            var    p6 = null;
            var    p7 = null;
            var    p8 = null;
            var    p9 = null;   
            var digitoVerificador  = null;
            var suma    = null;
            var residuo = null;
            var modulo  = null;
            var pub     = null;
            var pri     = null;
            var nat     = null;
                        
            /* Verifico que el campo no contenga letras */                  
            var ok=1;
            let i =0;
            for (i=0; i<me.numero.length && ok==1 ; i++){
                var n = parseInt(this.numero.charAt(i));
                if (isNaN(n)) ok=0;
            }
            if (ok==0){
                me.$vs.notify({
                    text: 'No puede ingresar caracteres a la cedula',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    time:8000
                 })     
                me.validacionCedula = false; 
                return false;
            }        
            if (me.numero.length < 10 ){         
                  me.$vs.notify({
                    text: 'La cedula ingresada no es válida',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    time:8000
                 })       
                me.validacionCedula = false;             
                return false;
            }
            me.cedulaVerificar = "";
            let provincia = null;
            /* Los primeros dos digitos corresponden al codigo de la provincia */
            provincia = me.numero.substr(0,2);      
            if (provincia < 1 || provincia > me.numeroProvincias){   
                  me.$vs.notify({
                    text: 'El código de la provincia (dos primeros dígitos) es inválido',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    time:8000
                 })         
                me.validacionCedula = false; 
                return false;       
            }
            /* Aqui almacenamos los digitos de la cedula en variables. */
            d1  = me.numero.substr(0,1);         
            d2  = me.numero.substr(1,1);         
            d3  = me.numero.substr(2,1);         
            d4  = me.numero.substr(3,1);         
            d5  = me.numero.substr(4,1);         
            d6  = me.numero.substr(5,1);         
            d7  = me.numero.substr(6,1);         
            d8  = me.numero.substr(7,1);         
            d9  = me.numero.substr(8,1);         
            d10 = me.numero.substr(9,1);                    
            /* El tercer digito es: */                           
            /* 9 para sociedades privadas y extranjeros   */         
            /* 6 para sociedades publicas */         
            /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
            if (d3==7 || d3==8){   
                 me.$vs.notify({
                    text: 'El tercer dígito ingresado es inválido',
                    color: 'warning',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    time:8000
                 })         
                me.validacionCedula = false;                  
                return false;
            }             
            /* Solo para personas naturales (modulo 10) */         
            if (d3 < 6){           
                nat = true;            
                p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
                p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
                p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
                p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
                p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
                p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
                p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
                p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
                p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
                modulo = 10;
            }         
            /* Solo para sociedades publicas (modulo 11) */                  
            /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
            else if(d3 == 6){           
                pub = true;             
                p1 = d1 * 3;
                p2 = d2 * 2;
                p3 = d3 * 7;
                p4 = d4 * 6;
                p5 = d5 * 5;
                p6 = d6 * 4;
                p7 = d7 * 3;
                p8 = d8 * 2;            
                p9 = 0;            
            }         
                
            /* Solo para entidades privadas (modulo 11) */         
            else if(d3 == 9) {           
                pri = true;                                   
                p1 = d1 * 4;
                p2 = d2 * 3;
                p3 = d3 * 2;
                p4 = d4 * 7;
                p5 = d5 * 6;
                p6 = d6 * 5;
                p7 = d7 * 4;
                p8 = d8 * 3;
                p9 = d9 * 2;            
            }           
            suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
            residuo = suma % modulo;                                         
            /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
            digitoVerificador = residuo==0 ? 0: modulo - residuo;                
            /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
            if (pub==true){           
                if (digitoVerificador != d9){                   
                    me.$vs.notify({
                        text: 'El ruc de la empresa del sector público es incorrecto.',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })         
                    
                    me.validacionCedula = false; 
                    return false;
                }                  
                /* El ruc de las empresas del sector publico terminan con 0001*/         
                if ( me.numero.substr(9,4) != '0001' ){      
                      me.$vs.notify({
                        text: 'El ruc de la empresa del sector público debe terminar con 0001.',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })                
                    me.validacionCedula = false; 
                    return false;
                }
            }         
            else if(pri == true){         
                if (digitoVerificador != d10){    
                      me.$vs.notify({
                        text: 'El ruc de la empresa del sector privado es incorrecto.',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })                         
                    me.validacionCedula = false;  
                    return false;
                }         
                if ( me.numero.substr(10,3) != '001' ){ 
                    me.$vs.notify({
                        text: 'El ruc de la empresa del sector privado debe terminar con 001',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })                       
                    
                    me.validacionCedula = false; 
                    return false;
                }
            }      
            else if(nat == true){         
                if (digitoVerificador != d10){  
                     me.$vs.notify({
                        text: 'El número de cédula de la persona natural es incorrecto.',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })                           
                    me.validacionCedula = false; 
                    return false;
                }         
                if (me.numero.length >10 && me.numero.substr(10,3) != '001' ){  
                     me.$vs.notify({
                        text: 'El ruc de la persona natural debe terminar con 001',
                        color: 'warning',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        time:8000
                    })                      
                    me.validacionCedula = false; 
                    return false;
                 }
      }   
      me.validacionCedula = true;    
      return true;   
   }        
    },
    components: {
        FormWizard,
        TabContent
    }
}
</script>
<style scoped>
.fondo{
   
    border-radius: 50px 0px 0px 50px;
}
.hlogin{
    border-radius: 0px 50px 50px 0px;
    box-shadow: 10px 0px 5px #ccc;
    background: #4CA1AF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #65B2F1, #76DBEF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #65B2F1, #76DBEF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    margin-top:90px;
    
}
@media only screen and (max-width: 600px) {
  .prueba {
      display: none!important;
  }
  
}
@media only screen and (max-width: 820px) {
  .prueba {
      display: none!important;;
  }
  
}


</style>
