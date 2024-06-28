$(document).ready(() => {
  $(".slide").slick({
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
  });

  const url = "https://testologia.ru/checkout";
  const form = $(".popup-form-buttons");
  const popupCalc = $(".popup-calc");
  const popupClose = $(".popup-close");
  const inputs = {
    name: $("#inp-name"),
    phone: $("#inp-phone"),
    mail: $("#inp-mail"),
    message: $("#inp-message"),
    size: $("#inp-size"),
  };
  const menu = $(".catalog-list li span");
  const popupPrice = $(".popup-check-price");

  $("#calculate").click(() => {
    popupCalc.show();
  });

  popupClose.each((index, element) => {
    $(element).click(() => {
      popupCalc.hide();
      popupPrice.hide();
    });
  });

  const setErrorStyles = (input) => {
    input.css("border-color", "rgb(218, 27, 27)");
    input.next().css("color", "rgb(218, 27, 27)");
  };

  const validateInputs = () => {
    let isValid = true;
    const params = {};

    Object.keys(inputs).forEach((key) => {
      const input = inputs[key];
      const value = input.val().trim();
      if (!value) {
        isValid = false;
        setErrorStyles(input);
      } else {
        params[key] = value;
        input.css("border-color", "");
        input.next().css("color", "");
      }
    });

    return { isValid, params };
  };

  form.submit((event) => {
    event.preventDefault();

    const { isValid, params } = validateInputs();

    if (isValid) {
      $.ajax({
        url,
        method: "POST",
        data: params,
      })
        .done((msg) => {
          if (msg.success === 1) {
            form.hide();
            $(".success-text").show();
          } else {
            $(".popup-input input").val("");
            inputs.message.val("");
            popupCalc.hide();
            alert(
              "Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ"
            );
          }
        })
        .fail((jqXHR, textStatus) => {
          alert(`Request failed: ${textStatus}`);
        });
    }
  });

  menu.each((index, element) => {
    $(element).click(() => {
      menu.css({
        "border-bottom": "",
        "border-color": "",
      });
      $(element).css({
        "border-bottom": "1px solid",
        "border-color": "rgb(255,255,255)",
      });
    });
  });

  $(".btn-price").click(() => {
    popupPrice.show();
  });
});
