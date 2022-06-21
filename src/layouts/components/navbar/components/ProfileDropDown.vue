<template>
<div class="the-navbar__user-meta flex items-center" v-if="usuario.nombres">

    <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">{{ usuario.nombres }}</p>
        <p class="font-semibold">{{ usuario.apellidos }}</p>
        <small> {{usuario.grupo}} </small>        
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

        <div class="con-img ml-3">
            <img  key="onlineImg" src="https://www.seekpng.com/png/full/72-729756_how-to-add-a-new-user-to-your.png" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
        </div>

        <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem"> 
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">
                    <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Salir</span>
                </li>
            </ul>
        </vs-dropdown-menu>
    </vs-dropdown>
</div>
</template>

<script>
export default {
    data() {
        return {
            usuario: []
        }
    },
    computed: {
        activeUserInfo() {
            return this.$store.state.AppActiveUser
        }
    },
    created() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        console.log(this.usuario);
    },
    methods: {
        async logout() {
            let me = this;
                 this.$router.push('/');     
                    localStorage.clear();
            // if(me.usuario.id_group == 18 || me.usuario.id_group == 19 || me.usuario.id_group == 20 || me.usuario.id_group == 21){
            //      this.$router.push('/northospital');     
            //     localStorage.clear();
               
            //     location.reload();
            // }else{
            //     await this.$store.dispatch('logout')
            //     this.$router.push('/');
            // }
            
        },
        perfil() {
            this.$router.push('/perfil');
        }
    }
}
</script>
