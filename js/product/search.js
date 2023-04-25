// get the query string search
const queryString = window.location.search;
// get the search value
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get("search");
// set the search value in the title
document.getElementById("search").innerHTML = search;

// localhost:9090/api/v1/product/search?word=Gelatina

// get the products
const products = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/product/search?word=${search}`
    );
    const data = await response.json();

    const containerproducts = document.getElementById("containerproducts");
    data.forEach((product) => {
      containerproducts.innerHTML += `
      <div class="product">
        <img src="../img/hamaca.jpg" alt="">
        <section>
          <h1>${product.product_name}</h1>
          <p>${product.product_description}</p>
          <h2><b>$ ${product.product_price}</b></h1>
            <p>Stock: <small>${product.product_inventory}</small></p>
            <button class="btn btn-primary">Show Product</button>
        </section>
      </div>
        `;
    });
  } catch (error) {
    console.log(error);
  }
};
products();

// Path: js/product/search.js
