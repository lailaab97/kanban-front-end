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
    <f7-block-title>Liste des développeurs</f7-block-title>
    <f7-list>
       <f7-list-item v-for="developer in developers" :key="developer.id" :title="developer.firstname">
            <!-- :link="`/insecte/${insecte.id}/`" media="static/img/icon-insecte.png"> -->
          </f7-list-item>
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


    Axios.get("http://localhost:8080"+'/developers').then(response => {
      this.developers = response.data.sort(sortByProperty('firstname'));
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

      };
      
    }
  };
</script>
