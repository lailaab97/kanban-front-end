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
    <f7-block-title>Details </f7-block-title>
    <f7-list>
        <h3>Task: {{ task.title}} </h3>
      <h4>Number of hours forecast: </h4>
      <p> {{task.nbHoursForecast}}</p>
      <h4>Number of Real hours </h4>
            <p> {{task.nbHoursReal}}</p>
          <h4>Created </h4>
            <p> {{task.created}}</p>
        <h3> Developers </h3>

      <p v-for="developer in task.developers" :key="developer.id"> <strong> {{developer.firstname}} </strong> </p> 
    </f7-list>
    <f7-link back>back</f7-link>


  </f7-page>
</template>
<script>
import Axios from "axios";

  export default {
  created () {
            const self = this;
        const app = self.$f7;
        const router = self.$f7router;
    var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};
app.preloader.show();
  setTimeout(function () {
   app.preloader.hide();
 }, 3000);


    Axios.get("http://localhost:8080"+'/tasks').then(response => {
    var taskId = this.$f7route.params.id;
    var currentTask;

      this.tasks = response.data;
      this.tasks.forEach(function (one) {
        if (one.id == taskId) {
           currentTask = one;
           console.log(currentTask)
        }
        else {
        console.log("not found");
        }
      });
      app.preloader.hide();
      this.task = currentTask;

    //  console.log(response.data)
      }).catch(
    function (error) {
      app.preloader.hide();
      app.dialog.alert("On a rencontré une erreur pendant la récupération des données"+error)
    }
  );
    },
    
    data: function () {

      return {
        tasks: [],
        task:'',
        

      };
      
    }
  };
</script>
