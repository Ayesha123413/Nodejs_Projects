$(document).ready(function () {
  console.log("accout.js is running");
  const PUBLISHABLE_KEY =
    "pk_test_51M4cj7GP5UTaUYFNsu63DseML4E7S37SaYP5Y0G1QsDTLSoHzyNOAzhBDej7h9QP0f740dMBZPTlMoXdFV7St1wD00tI60lRGP";

  const stripe = Stripe(PUBLISHABLE_KEY);

  const checkoutbutton = $("#checkout-button");
  checkoutbutton.click(function () {
    console.log("Buy now button working ");
    const product = $('input[name="product"]:checked').val();
    console.log(product);
    fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application / json",
      },
      body: JSON.stringify({
        product,
      }),
    })
      .then((result) => result.json())
      .then(({ sessionId }) => {
        stripe.redirectToCheckout({
          sessionId,
        });
      });
  });
});
