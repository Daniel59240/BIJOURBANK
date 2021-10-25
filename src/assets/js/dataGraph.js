// Ficher graphe

const title = document.title;

var myData = JSON.parse(localStorage.getItem("data"));

var solde = 0;

const datapoints = [solde];

 

if (title === "index") {

  myData.forEach((obj) => {

    if (obj["operator"] === "credit") {

      solde = solde + parseInt(obj["montant"]);

      datapoints.push(solde);

    }

    if (obj["operator"] === "debit") {

      solde = solde - parseInt(obj["montant"]);

      datapoints.push(solde);

    }

  });

 

} else if (title === "credit") {

  myData.forEach((obj) => {

    if (obj["operator"] === "credit") {

      solde = solde + parseInt(obj["montant"]);

      datapoints.push(solde);

    }

  });

 

} else if (title === "debit") {

  myData.forEach((obj) => {

    if (obj["operator"] === "debit") {

      solde = solde + parseInt(obj["montant"]);

      datapoints.push(solde);

    }

  });

}




// <block:setup:1>

 

const DATA_COUNT = datapoints.length + 2;

const labels = [];

for (let i = 0; i < DATA_COUNT; ++i) {

  labels.push(i.toString());

}

const data = {

  labels: labels,

  datasets: [

    {

      label: "Compte",

      data: datapoints,

      borderColor: "purple",

      //   fill: true,

      cubicInterpolationMode: "monotone",

    },

  ],

};

// </block:setup>

 

// <block:config:0>

const config = {

  type: "line",

  data: data,

  options: {

    elements: {

      point: {

        radius: 0,

      },

    },

    responsive: true,

    plugins: {

      legend: false,

      //   title: {

      //     display: true,

      //     text: "Chart.js Line Chart - Cubic interpolation mode",

      //   },

    },

    interaction: {

      intersect: false,

    },

    scales: {

      x: {

        display: false,

      },

      y: {

        display: false,

      },

    },

  },

};

 

/*Le contexte du canevas HTML */

if (title === "index") {

  context = document.getElementById("myChart").getContext("2d");

 

} else if (title === "credit") {

  context = document.getElementById("myChartCredit").getContext("2d");

 

} else if (title === "debit") {

  context = document.getElementById("myChartDebit").getContext("2d");

 

}




/* Cr??ation du graphique */

chart = new Chart(context, config);

 

/* G??n??rer des donn??es al??atoires */

function generateData() {

  randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres apr??s la virgule

  addTemperature(new Date().toLocaleTimeString(), randomTemperature);

}

 

function addTemperature(time, temperature) {

  /* Ajoute la valeur en X */

  config.data.labels.push(time);

 

  /* Ajoute la valeur */

  config.data.datasets[0].data.push(temperature);

 

  /* Rafraichir le graphique */

  chart.update();

}
