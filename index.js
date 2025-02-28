document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    // Получаем TableName
    const tableName = getQueryParam("TableName");

    // Декодируем название стола (если оно содержит спецсимволы)
    const decodedTableName = decodeURIComponent(tableName);

    const tableElement_f = document.getElementById(decodedTableName);
    if (tableElement_f) {
      observer.disconnect();
      console.log("Элемент найден!", tableElement_f);

      // Теперь можно работать с `tableElement_f`
      const yello = tableElement_f.querySelector(".tableElement");
      if (yello) {
        console.log("Элемент найден:", yello);
        const allNestedElements = yello.querySelectorAll("*");
        console.log("Вложенные элементы:", allNestedElements);
      } else {
        console.warn("Внутренний элемент .tableElement не найден.");
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document
    .getElementById("new_tree")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        const targetClass = event.target.getAttribute("data-target");
        const decodedTarget = decodeURIComponent(targetClass);

        const oldButton = document.querySelector(
          `#Login > div.dialogcontent > div.${decodedTarget} > button, 
                     #Login > div.dialogcontent > div#${decodedTarget} > button`
        );

        const selectTab = document.querySelector(
          `#${decodedTarget} > ul > li:nth-child(2)`
        );
        const selectGame = document.querySelector(
          "#RingGrid > div.grid_data > div:nth-child(1) > div:nth-child(1)"
        );
        const game = document.querySelector(
          "#RingGrid > div.grid_data > div:nth-child(1) > div:nth-child(1)"
        );

        function triggerClick(
          element,
          events = ["mousedown", "mouseup", "click"]
        ) {
          if (element) {
            events.forEach((eventType) => {
              const event = new MouseEvent(eventType, {
                bubbles: true,
                cancelable: true,
                view: window,
              });
              element.dispatchEvent(event);
            });
          } else {
            console.error(`Элемент с target: ${decodedTarget} не найден!`);
          }
        }

        triggerClick(selectGame);
        triggerClick(game, ["click"]);
        triggerClick(selectTab);
        triggerClick(oldButton);
      }
    });
});
