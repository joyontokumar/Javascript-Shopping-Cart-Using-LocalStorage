/*
	Shopping Add to Cart using javascript localStorage
*/

var showHhtml = "";
var output = document.getElementById("output");
var totalCart = document.getElementById("total_cart_show");
var shopCart = [];
var MoblieItems = [
  {
    name: "mobile",
    details:
      "Mobile technology is indispensable in the modern workplace. Due to its versatility,",
    cost: 300
  },
  {
    name: "samsung",
    details:
      "Workplace distractions - as the range of technologies and devices increases, so ",
    cost: 200
  },

  {
    name: "nokia",
    details:
      "Increased IT security needs - portable devices are vulnerable to security risks, ",
    cost: 100
  },
  {
    name: "android",
    details:
      "Mobile phones are used for a variety of purposes, such as keeping in touch with ",
    cost: 120
  },
  {
    name: "grammenphone",
    details:
      "Cell phones are having a great influence in our live and very convenient to n",
    cost: 300
  },
  {
    name: "talitalk",
    details:
      "Mobile phones come with a built-in camera and hence it is very easy to capture .",
    cost: 150
  },
  {
    name: "banglalink",
    details:
      "Nowadays smartphones are available which helps in watching movie online, playing ",
    cost: 400
  },
  {
    name: "symphony",
    details:
      "although cell phone use can be dangerous while driving but sometimes it ",
    cost: 230
  },
  {
    name: "gallaxy",
    details:
      "In this modern age everyone possesses a smartphone which has many advantage.",
    cost: 120
  }
];

// all shopping function are call
window.onload = MainFunction;
function MainFunction() {
  itemListFun();
  // add to cart button click event
  var cartBtn = document.querySelectorAll(".add_to_cart_btn");

  for (var x = 0; x < cartBtn.length; x++) {
    cartBtn[x].addEventListener("click", function(e) {
      e.preventDefault();
      addItem();
    });
  }
  outputCart();
}

// add item in cart
function addItem() {
  var iteminfo = event.target.dataset;
  iteminfo.qty = 1;
  var itemcartMin = false;

  // akai item k jokon click korbo bar bar

  shopCart.forEach(function(single) {
    if (single.id == iteminfo.id) {
      single.qty = parseInt(single.qty) + parseInt(iteminfo.qty);
      itemcartMin = true;
    }
  });

  if (!itemcartMin) {
    shopCart.push(iteminfo);
  }

  localStorage.setItem("scart", JSON.stringify(shopCart));
  // total items add to cart show html
  outputCart();
}

// total items add to cart show html
function outputCart() {
  if (localStorage.getItem("scart") != null) {
    shopCart = JSON.parse(localStorage.getItem("scart"));
  }
  var cartOutout =
    '<table class="table table-bordered table-hover table-striped"><thead><th>Quantity</th><th> Item </th><th>Cost</th><th>Total</th> <th>Option</th></thead>';
  var total = 0;
  shopCart.forEach(function(single) {
    var stotal = single.qty * single.price;
    total += stotal;
    cartOutout +=
      '<tr data-row="' +
      single.id +
      '"><td>' +
      single.qty +
      "</td><td>" +
      single.name +
      "</td><td>" +
      single.price +
      "</td><td>" +
      convertDoller(stotal) +
      '</td><td><span class=" btn btn-danger btn-sm removeItem"  onclick="removeitem(' +
      single.id +
      ')" ><i class="fa fa-remove"></i></span><span class=" btn btn-primary btn-sm updateItem" data-action="edit" onclick="updateitem(' +
      single.id +
      ')"><i class="fa  fa-edit"></i></span></td></tr>';
  });

  cartOutout +=
    '<tr><td class="totalPrice bg-secondary " colspan=6>Total Amount : ' +
    convertDoller(total) +
    "</td></tr></table>";
  totalCart.innerHTML = cartOutout;
}

// item show in front page function
function itemListFun() {
  var x = 0;
  MoblieItems.forEach(function(item) {
    showHhtml += `<div class="col-md-4">
		<div class="item_wrapper">
			<img src="http://placehold.it/350x250" alt="product" class="img-fluid"/>
			<div class="item_details">
				<h3>${item.name}</h3>
				<h4>${item.cost} taka</h4>
				<p>${item.details}</p>
				<h3>
					<a href="#" class="add_to_cart_btn btn btn-primary btn-sm" data-price="${
            item.cost
          }" 
						data-id="${x}" data-name="${item.name}" data-s="${item.details}">
						Add To Cart
					</a>
				</h3>
			</div>
		</div>
	</div>`;
    x++;
  });
  output.innerHTML += showHhtml;
}

// taka to doller transfer
function convertDoller(money) {
  return "$" + (money / 80).toFixed(2);
}

// remove item
function removeitem(id) {
  if (confirm("Are you want to delete this item ??")) {
    for (var i = 0; i < shopCart.length; i++) {
      if (shopCart[i].id == id) {
        var rem = shopCart.splice(i, 1);
      }
    }
    localStorage.setItem("scart", JSON.stringify(shopCart));
    outputCart();
  }
}

// edit item
function updateitem(id) {
  var update = document.querySelectorAll('[data-action="edit"]');
  for (let i = 0; i < update.length; i++) {
    update[i].addEventListener("click", function(e) {
      var row = this.closest("[data-row]");
      var rid = row.getAttribute("data-row");
      row.style.backgroundColor = "Yellow";
      var td = row.firstElementChild;
      console.log(td);
      var input = document.createElement("input");
      input.type = "text";
      input.value = Number(td.innerText);
      td.innerHTML = "";
      td.appendChild(input);
      input.focus();

      input.onblur = function() {
        td.removeChild(input);
        td.innerHTML = input.value;
        row.style.backgroundColor = "transparent";
      };
    });
  }
}
