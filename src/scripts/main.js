$(document).ready(() => {
  $(".slide").slick({
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
  });

  new WOW().init();

  let popupCalc = $(".popup-calc");
  let popupPrice = $(".popup-check-price");
  let catalogMenu = $(".catalog-list li span");
  let url = "https://testologia.ru/checkout/";

  //показ попап при клике на "Расчет на эскизам" и кнопку "Рассчитать"
  $("#calculate").click(() => {
    popupCalc.show();
    $("body").css("overflow", "hidden");
  });

  $(".btn-price").click(() => {
    popupPrice.show();
    $("body").css("overflow", "hidden");
  });

  //скрытие попапов при клике на "х"
  $(".popup-close").each((i, elem) => {
    $(elem).click(() => {
      popupCalc.hide();
      popupPrice.hide();
      $("body").css("overflow", "");
    });
  });

  // меню переключение
  catalogMenu.each((index, element) => {
    $(element).click(() => {
      catalogMenu.css({
        "border-bottom": "",
        "border-color": "",
      });
      $(element).css({
        "border-bottom": "1px solid",
        "border-color": "rgb(255, 255, 255)",
      });
    });
  });

  // при нажатии на кнопку заказать со скидкой скрол до товаров
  $(".sale-btn").click(() => {
    $("html, body").animate(
      {
        scrollTop: $(".catalog").offset().top,
      },
      1000
    );
  });

  // валидация футера
  $(".footer-form button").click((e) => {
    e.preventDefault();
    if ($(".footer-form input").val()) {
      $(".footer-form").hide();
      $(".footer-success").css("display", "block");
    }
  });

  // при наведении на названия соц.сетей непрозрачность на 90%
  $(".social-name p").hover(
    function () {
      $(this).css("color", "rgba(200, 200, 200, 0.9)");
    },
    function () {
      $(this).css("color", "");
    }
  );

  // валидация  и отправка запроса попа check-price

  let name = $("#name");
  let phone = $("#phone");
  let mail = $("#mail");
  let message = $("#message");
  let successText = $(".success-price");

  $(".popup-btn").click(function (e) {
    e.preventDefault();

    $(".popup-price-input").css("border-color", "");
    $(".error-message").css("color", "transparent");

    let isValid = true;

    if (!name.val()) {
      name.css("border-color", "red");
      name.next().css("color", "red");
      isValid = false;
    }
    if (!phone.val()) {
      phone.css("border-color", "red");
      phone.next().css("color", "red");
      isValid = false;
    }
    if (!mail.val()) {
      mail.css("border-color", "red");
      mail.next().css("color", "red");
      isValid = false;
    }
    if (!message.val()) {
      message.css("border-color", "red");
      message.next().css("color", "red");
      isValid = false;
    }

    if (isValid) {
      $.ajax({
        url: url,
        type: "POST",
        data: {
          name: name.val(),
          phone: phone.val(),
          mail: mail.val(),
          message: message.val(),
        },
        success: function (response) {
          console.log("Form submitted successfully", response);
          if (response.success === 0) {
            alert("Что то пошло нет, попробуйте по позже");
            popupPrice.hide();
          } else if (response.success === 1) {
            $(".popup-price-form").hide();
            successText.show();
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Form submission failed: ", textStatus, errorThrown);
          popupCalc.hide();
        },
      });
    }
    name.val("");
    phone.val("");
    mail.val("");
    message.val("");
    successText.hide();
  });

  // валидация и отправка запроса  popup-calc

  let calcName = $("#inp-name");
  let calcPhone = $("#inp-phone");
  let calcMail = $("#inp-mail");
  let calcSize = $("#inp-size");
  let calcMessage = $("#inp-message");
  let calcSuccess = $("#success-text");

  $(".calc-btn").click(function (e) {
    e.preventDefault();

    $(".popup-input input").css("border-color", "");
    $(".popup-input p").css("color", "transparent");

    let isValid = true;

    if (!calcName.val()) {
      calcName.css("border-color", "red");
      calcName.next().css("color", "red");
      isValid = false;
    }
    if (!calcPhone.val()) {
      calcPhone.css("border-color", "red");
      calcPhone.next().css("color", "red");
      isValid = false;
    }
    if (!calcMail.val()) {
      calcMail.css("border-color", "red");
      calcMail.next().css("color", "red");
      isValid = false;
    }
    if (!calcSize.val()) {
      calcSize.css("border-color", "red");
      calcSize.next().css("color", "red");
      isValid = false;
    }
    if (calcMessage === "") {
      calcMessage.css("border-color", "red");
      calcMessage.next().css("color", "red");
      isValid = false;
    }

    if (isValid) {
      $.ajax({
        url: url,
        type: "POST",
        data: {
          name: calcName.val(),
          phone: calcPhone.val(),
          mail: calcMail.val(),
          message: calcMessage.val(),
        },
        success: function (response) {
          console.log("Form submitted successfully", response);
          if (response.success === 0) {
            alert("Что то пошло нет, попробуйте по позже");
            popupCalc.hide();
          } else if (response.success === 1) {
            $(".popup-price-form").hide();
            calcSuccess.show();
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Form submission failed: ", textStatus, errorThrown);
          popupCalc.hide();
        },
      });
    }
  });
});
