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
  });

  $(".btn-price").click(() => {
    popupPrice.show();
  });

  //скрытие попапов при клике на "х"
  $(".popup-close").each((i, elem) => {
    $(elem).click(() => {
      popupCalc.hide();
      popupPrice.hide();
    });
  });

  //показ названия товаров
  $(".catalog-image").hover(
    function () {
      $(this).next().show();
    },
    function () {
      let nextElem = $(this).next();
      setTimeout(function () {
        if (!nextElem.is(":hover")) {
          nextElem.hide();
        }
      }, 200);
    }
  );

  $(".catalog-image")
    .next()
    .hover(
      function () {
        $(this).show();
      },
      function () {
        $(this).hide();
      }
    )
    .on("click", function () {
      popupPrice.show();
      $(this).hide();
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

  // валидация и отправка запроса попапа "Расчет по эскизам"

  function checkInputs(input) {
    input.next("p").css("color", "red");
    input.css("border-color", "red");
    return false;
  }

  let inputName = $("#inp-name");

  $("#calc-btn").click(function (e) {
    e.preventDefault();

    let isValid = true;

    if (inputName.val().trim() === "") {
      checkInputs(inputName);
      isValid = false;
    }
  });

  // валидация  и отправка запроса

  let name = $("#name");
  let phone = $("#phone");
  let mail = $("#mail");
  let message = $("#message");

  $(".popup-btn").click(function (e) {
    e.preventDefault();

    $(".popup-price-input").css("border-color", "");
    $(".error-message").css("color", "transparent");

    let isValid = true;

    if (!name.val()) {
      name.css("border-color", "red");
      name.next().css("color", "red");
      console.log(name.val());
      isValid = false;
    }
    if (!phone.val()) {
      phone.css("border-color", "red");
      phone.next().css("color", "red");
      console.log(phone.val());
      isValid = false;
    }
    if (!mail.val()) {
      mail.css("border-color", "red");
      mail.next().css("color", "red");
      console.log(mail.val());
      isValid = false;
    }
    if (!message.val()) {
      message.css("border-color", "red");
      message.next().css("color", "red");
      console.log(message.val());
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
          popupCalc.hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Form submission failed: ", textStatus, errorThrown);
          popupCalc.hide();
        },
      });
    }
  });
});
