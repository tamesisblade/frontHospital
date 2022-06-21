<template>
  <vs-card>
    <br>
    <vs-alert :title="tituloReporte"></vs-alert>
    <div v-if="status == 'no'" class="mt-2" >
         <vs-row>
            <vs-col   vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <flat-pickr :config="configdateTimePicker" v-model="fromDate"  placeholder="Fecha Inicio" class="m-1" style="display: inline-block;width: 100%;" />
            </vs-col>
            <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <flat-pickr :config="configdateTimePicker" v-model="toDate" placeholder="Fecha Fin" class="m-1" style="display: inline-block;width: 100%" />
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" style="margin-top:20px;">
                <vs-button  type="gradient" @click="filtrarReporte()">Generar Reporte</vs-button>
            </vs-col>
        </vs-row>
    </div>  
    <e-charts autoresize :options="pie" ref="pie" auto-resize class="mt-2" />
  </vs-card>
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/pie";
import moment from "moment";
export default {
  data() {
    return {
      tituloReporte:'',
      status:'no',
      getReportVisitas:[],
      empresas:["uno","dos"],
      docente_nombres:"",
      docente_apellidos:"",
      filtro:[],
      recursos1insti: "",
      recursos2insti: "",
      recursos3insti: "",
      recursos4insti: "",
      recursos5insti: "",
      recursos6insti: "",
      recursos7insti: "",
      recursos8insti: "",
      recursos9insti: "",
      recursos10insti: "",
      recursos11insti: "",
      recursos12insti: "",
      recursos13insti: "",
      recursos14insti: "",
      pie: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.empresas

        },
        series: [
          {
            name: "Visitas:",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            color: ["#FFD5CC", "#EE6345", "#B73E24", "#DCB42B", "#8E7314","#F1E70B", "#6A99E5", "#6F8D2A", "#23E3B8", "#39AD93","#ED3F69", "#B83FED", "#5A1CC6", "#1C24C6", "#0C6F74"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
       /*VARIABLE PARA LOS REPORTE */
            lookReport:false,
            fromDate: null,
            toDate: null,
            configdateTimePicker: {
                enableTime: true,
                dateFormat: 'Y-m-d'
            },
            ReportVisitas:[],
             //**FIN VARIABLES PARA LOS REPORTES */
    };
  },
  components: {
    ECharts,
    flatPickr,
  },
  props:{
    // ReportVisitas:{
    //     type:Object
    // }
  },
  created() {
    let me = this 
    me.tituloReporte = localStorage.tituloReporte
      me.getReportVisitas = JSON.parse(localStorage.getItem("ReportVisitas"))
      for (let i = 0; i < this.getReportVisitas.length; i++) {
        this.pie.series[0].data.push({
            "name": me.getReportVisitas[i].name,
            "value": me.getReportVisitas[i].value,
        })
    }
   
    console.log('reporte',this.pie.series.data)
    // this.pie.series[0].data = [
    //   { name: this.ReportVisitas[0].name, value: this.ReportVisitas[0].value },
    //   { name: this.ReportVisitas[1].name, value: this.ReportVisitas[1].value },
    // ]
  
  },
  mounted() {
    let me = this;
    me.status =  localStorage.getItem('reporte')
    let dataIndex = -1;
    let pie = this.$refs.pie;
    let dataLen = pie.options.series[0].data.length;
        setInterval(() => {
        pie.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex,
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex,
        });
        pie.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex,
        });
        }, 1000);
  },
  methods:{
      filtrarReporte(){
            let me = this;
               if(me.fromDate == null){
               me.$vs.notify({
                    text: 'Debe escoger una fecha inicio',
                    color:'warning',
                    iconPack: 'feather',
                    icon:'icon-check'})
                return false;
           }
            if(me.toDate == null){
               me.$vs.notify({
                    text: 'Debe escoger una fecha final',
                    color:'warning',
                    iconPack: 'feather',
                    icon:'icon-check'})
                return false;
           }
            if(me.fromDate > me.toDate){
                me.$vs.notify({
                    text: 'La fecha inicio no puede mayor que la fecha final',
                    color:'warning',
                    iconPack: 'feather',
                    icon:'icon-check'})
                return false;
            }
            let from = moment(me.fromDate).format('YYYY-MM-DD')
            let to   = moment(me.toDate).format('YYYY-MM-DD')
            me.$vs.loading()
            //QUIRURGUICA
            if(localStorage.getItem("quiruguica") == "yes"){
                if(localStorage.getItem("individual") == "yes"){
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate="+from+'&toDate='+to+'&id='+localStorage.idmedico+'&quiruguica=yes')
                  .then(function (res) {
                      me.$vs.loading.close()
                      localStorage.setItem('ReportVisitas',JSON.stringify(res.data))
                      me.ReportVisitas = res.data
                      localStorage.setItem('reporte','yes')
                      me.status =  localStorage.setItem('reporte','yes')
                      me.$router.push('/hospital/visitas')
                  
                      // location.reload()
                    
                  })
                  .catch(function(e){
                      me.$vs.loading.close()
                  });
                }else{
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate="+from+'&toDate='+to+'&quiruguica=yes')
                  .then(function (res) {
                      me.$vs.loading.close()
                      localStorage.setItem('ReportVisitas',JSON.stringify(res.data))
                      me.ReportVisitas = res.data
                      localStorage.setItem('reporte','yes')
                      me.status =  localStorage.setItem('reporte','yes')
                      me.$router.push('/hospital/visitas')
                  
                      // location.reload()
                    
                  })
                  .catch(function(e){
                      me.$vs.loading.close()
                  });
                } 
            }
            //VISITAS
            else{
                if(localStorage.getItem("individual") == "yes"){
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate="+from+'&toDate='+to+'&id='+localStorage.idempresa)
                  .then(function (res) {
                      me.$vs.loading.close()
                      localStorage.setItem('ReportVisitas',JSON.stringify(res.data))
                      me.ReportVisitas = res.data
                      localStorage.setItem('reporte','yes')
                      me.status =  localStorage.setItem('reporte','yes')
                      me.$router.push('/hospital/visitas')
                  
                      // location.reload()
                    
                  })
                  .catch(function(e){
                      me.$vs.loading.close()
                  });
                }else{
                this.$http.get(this.$server_url + "h_visitas_reporte?fromDate="+from+'&toDate='+to)
                  .then(function (res) {
                      me.$vs.loading.close()
                      localStorage.setItem('ReportVisitas',JSON.stringify(res.data))
                      me.ReportVisitas = res.data
                      localStorage.setItem('reporte','yes')
                      me.status =  localStorage.setItem('reporte','yes')
                      me.$router.push('/hospital/visitas')
                  
                      // location.reload()
                    
                  })
                  .catch(function(e){
                      me.$vs.loading.close()
                  });
              } 
            }
           
            
                
   
        },
  }
};
</script>