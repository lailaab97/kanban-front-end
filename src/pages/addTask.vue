<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Kanban</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
<f7-list form v-on:submit.prevent="postTask">
      <f7-list-input
        label="Title"
        type="text"
        placeholder="Title"
         @input="form.title = $event.target.value"
        v-model.lazy="form.title"
      />
      <f7-list-input
        label="Number of hour forecast"
        type="number"
        placeholder="Number of hours"
        @input="form.nbHoursForecast = $event.target.value"
        v-model.number="form.nbHoursForecast"
      />
      <f7-list-item v-for="type in taskTypes" :key="type.id" radio name="my-radio" v-model="form.taskType" :title="type.label"></f7-list-item>
       <f7-block-title>Checkbox group</f7-block-title>
      <f7-list-item v-for="developer in developers" 
      :key="developer.id" 
      checkbox name="my-checkbox" 
      :title="developer.firstname"
      @change="checkDeveloper($event,developer.id)"
      ></f7-list-item>
    <button>SUBMIT </button>

    </f7-list>
        <f7-link back>back</f7-link>

  </f7-page>
</template>
<script>
import Axios from "axios";

  export default {
      methods: {
        postTask : function(){
                    const self = this;
        const app = self.$f7;
        const router = self.$f7router;
            Axios.post("http://localhost:8080"+'/tasks',this.form   
            ).then(response => {
                app.preloader.hide();
                app.dialog.alert("Task added successfully");
                console.log(response)
            }).catch(
            function (error) {
                app.preloader.hide();
                app.dialog.alert("On a rencontré une erreur pendant la récupération des données");
            }
        );
        
          },
        checkDeveloper: function(event,id) {
             const self = this;
            const value = event.target.value;
            var devChecked;
             this.developers.forEach(function (one) {
                if (one.id == id) {
                devChecked = one;
                console.log(devChecked)
                }
                else {
                console.log("not found");
                }
            });
            if (event.target.checked) {
            self.form.developers.push(devChecked);
            } else {
            self.form.developers.splice(self.form.developers.indexOf(value), 1);
            }
        },
        },
      
  created () {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;

app.preloader.show();
  setTimeout(function () {
   app.preloader.hide();
 }, 3000);


    Axios.get("http://localhost:8080"+'/task_types').then(response => {
      this.taskTypes = response.data;
      app.preloader.hide();

    //  console.log(response.data)
      }).catch(
    function (error) {
      app.preloader.hide();
      app.dialog.alert("On a rencontré une erreur pendant la récupération des données")
    }
  );
 Axios.get("http://localhost:8080"+'/developers').then(response => {
      this.developers = response.data;
    
      app.preloader.hide();

    //  console.log(response.data)
      }).catch(
    function (error) {
      app.preloader.hide();
      app.dialog.alert("On a rencontré une erreur pendant la récupération des données")
    }
  );

    },
    
    data: function () {

      return {
        developers: [],
        taskTypes: [],
        form:{
            title:' ',
            nbHoursForecast:'0',
            taskType:'',
            developers: [],

        }

      };
      
    }
  };
</script>
