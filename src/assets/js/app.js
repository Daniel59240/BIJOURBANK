console.log("Bijour Bank !");
/**
 * init foundation
 */

$(document).ready(function () {
  $(document).foundation();
});

var dataSet = [
  {
    operator: "credit",
    titre: "Salaire",
    desc: "mois de septembre",
    montant: 800,
  },
  {
    operator: "debit",
    titre: "Loyer",
    desc: "mois d'août",
    montant: 450,
  },
  {
    operator: "credit",
    titre: "Vente Boncoin",
    desc: "jeu ps5",
    montant: 25,
  },
  {
    operator: "debit",
    titre: "Restaurant",
    desc: "mc do",
    montant: 15,
  },
  {
    operator: "credit",
    titre: "Realisation site web",
    desc: "ma amirie",
    montant: 800,
  },
];

function oprationRetour(action) {
  if (action["operator"] === "credit") {
    return (
      '<div class="operation credit">' +
      '<div class="grid-x grid-padding-x align-middle">' +
      '<div class="cell shrink">' +
      '<div class="picto">' +
      '<img src="./assets/images/sac-dargent.png" alt="credit" />' +
      "</div>" +
      "</div>" +
      '<div class="cell auto">' +
      "<div>" +
      "<h2>" +
      action["titre"] +
      "</h2>" +
      "<small>" +
      action["desc"] +
      "</small>" +
      "</div>" +
      "</div>" +
      '<div class="cell small-3 text-right">' +
      "<div>" +
      '<p class="count">' +
      action["montant"] +
      "</p>" +
      "<small>100%</small>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  } else if (action["operator"] === "debit") {
    return (
      '<div class="operation debit">' +
      '<div class="grid-x grid-padding-x align-middle">' +
      '<div class="cell shrink">' +
      '<div class="picto">' +
      '<img src="./assets/images/depenses.png" alt="credit" />' +
      "</div>" +
      "</div>" +
      '<div class="cell auto">' +
      "<div>" +
      "<h2>" +
      action["titre"] +
      "</h2>" +
      "<small>" +
      action["desc"] +
      "</small>" +
      "</div>" +
      "</div>" +
      '<div class="cell small-3 text-right">' +
      "<div>" +
      '<p class="count">' +
      action["montant"] +
      "</p>" +
      "<small>100%</small>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }
}

// modification
function initLocalStorage() {
  if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", JSON.stringify(dataSet));
    location.reload();
  }
}
initLocalStorage();

function setLocalStorage(data){
  if (localStorage.getItem("data") !== null) {
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(data));
    location.reload();
  }else{
    initLocalStorage();
  }
}



var tmpData = JSON.parse(localStorage.getItem("data"));

const mesOperations = document.getElementById("mesOperations");

if (title === "index") {
  tmpData.forEach((op) => {
    var operation = oprationRetour(op);
    mesOperations.insertAdjacentHTML("beforeend", operation);
  });
} else if (title === "credit") {
  tmpData.forEach((op) => {
    if (op["operator"] === "credit") {
      var operation = oprationRetour(op);
      mesOperations.insertAdjacentHTML("beforeend", operation);
    }
  });
} else if (title === "debit") {
  tmpData.forEach((op) => {
    if (op["operator"] === "debit") {
      var operation = oprationRetour(op);
      mesOperations.insertAdjacentHTML("beforeend", operation);
    }
  });
}

const form = document.querySelector("form");
const buttonSubmit = document.getElementById("btSubmit");

function gererEnter() {
  return {
    operator: form.operator.value,
    titre: form.titre.value,
    desc: form.desc.value,
    montant: form.montant.value,
  };
}

buttonSubmit.addEventListener("click", (event) => {
  myData = gererEnter();
  dataSet.push(myData);
  setLocalStorage(dataSet);
  event.preventDefault();
});

var solde = 0;

if(title === "index"){
tmpData.forEach((op) => {
  if (op["operator"] === "credit") {
    solde = solde + parseInt(op["montant"]);
  } else if (op["operator"] === "debit") {
    solde = solde - parseInt(op["montant"]);
  }
});
}else if(title === "credit"){
tmpData.forEach((op) => {
  if (op["operator"] === "credit") {
    solde = solde + parseInt(op["montant"]);
  } 
});
}else if (title === "debit") {
  tmpData.forEach((op) => {
    if (op["operator"] === "debit") {
      solde = solde + parseInt(op["montant"]);
    }
  });
}
 


if (solde > 2000) {
  document.getElementById("commentaire").innerHTML =
    "Faite chauffer la carte sans soucis 🔥";
} else if (solde > 1000 && solde < 2000) {
  document.getElementById("commentaire").innerHTML = "On est bien 😎";
} else if (solde > 500 && solde < 1000) {
  document.getElementById("commentaire").innerHTML =
    "Faut faire gaffe a la marge ⛱ ";
} else if (solde > 50 && solde < 100) {
  document.getElementById("commentaire").innerHTML =
    "Faudrait remmetre des sous là 💶";
} else if (solde == 0) {
  document.getElementById("commentaire").innerHTML = "On est au point mort 😪";
}

document.getElementById("solde").innerHTML = solde;

console.log(tmpData);
