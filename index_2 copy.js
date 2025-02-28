// Ожидаем загрузки всего DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM полностью загружен и разобран");

  // 🔹 Функция для отслеживания изменений в DOM
  function observeChanges(targetNode) {
    if (!targetNode) {
      console.warn("Указанный узел для отслеживания не найден.");
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (document.getElementById("new_tree")?.contains(mutation.target)) {
            return;
          }
          // 🎯 Фильтруем только добавление новых элементов
          function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
          }

          const tableName = getQueryParam("TableName");
          const decodedTableName = decodeURIComponent(`R${tableName}`);
          // console.log("decodedTableName", decodedTableName);
          const tableElement_f = document.getElementById(decodedTableName);
          // console.log("tableElement_f", tableElement_f);

          if (tableElement_f) {
            const yello = tableElement_f.children;
            if (!yello[2]) return;

            const hiddenElements = [
              ...yello[2].querySelectorAll("div.hide"),
            ].filter((el) => el.classList.length === 1);

            let newTree = document.getElementById("new_button");

            hiddenElements.forEach((el, index) => {
              if (!newTree.querySelector(`[data-index='${index}']`)) {
                const button = document.createElement("button");
                button.textContent = `Нажать ${index + 1}`;
                button.style.display = "block";
                button.style.margin = "5px";
                button.dataset.index = index;
                button.dataset.target =
                  el.getAttribute("class") || `hide-${index}`;
                button.addEventListener("click", () => {
                  return clickElementByIndex(index, hiddenElements);
                });
                newTree.appendChild(button);
              }
            });
          } else {
            console.warn("Элемент с таким ID не найден.");
          }
        }

        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const inlineStyle = target.style.display; // Inline-стиль (style="")
          const computedStyle = getComputedStyle(target).display; // Итоговый стиль с учетом классов и CSS

          console.log(
            `⏳ Изменение style: ${inlineStyle}, Итоговый display: ${computedStyle}`
          );

          if (computedStyle === "block") {
            console.log(
              "✅ .dialog стал видимым (display: block) через inline-style →",
              target
            );
          } else if (computedStyle === "none") {
            console.log("❌ .dialog скрыт (display: none) →", target);
          }
        }

        // 🔹 2. Если `display` меняется через `classList`
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setTimeout(() => {
            const computedStyle = getComputedStyle(target).display;
            console.log(
              `🔄 Изменение classList: ${target.classList}, Итоговый display: ${computedStyle}`
            );

            if (computedStyle === "block") {
              console.log(
                "🎯 .dialog стал видимым через изменение classList →",
                target
              );
            }
          }, 50);
        }
      });
    });

    // 🔥 Функция запуска наблюдения
    function startObservingDialogs() {
      document.querySelectorAll(".dialog").forEach((element) => {
        console.log("dddddddddddddddddd", element);
        observer.observe(element, {
          attributes: true,
          attributeFilter: ["style", "class"],
        });
      });
    }

    startObservingDialogs();

    observer.observe(targetNode, { childList: true, subtree: true });
    console.log(`Наблюдение запущено за элементом:`, targetNode);
  }

  // 🔹 Выбираем, за чем следить
  const targetElement = document.body; // Или document.getElementById("мой_элемент")
  observeChanges(targetElement);

  document
    .getElementById("new_tree")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        const targetClass = event.target.getAttribute("data-target");

        const targetElement = event.target;

        const oldButton =
          document.querySelector(
            `#Login > div.dialogcontent > div.${targetClass} > button`
          ) ||
          document.querySelector(
            `#Login > div.dialogcontent > div#${targetClass}> button`
          ) ||
          null;

        const selectTab = document.querySelector(
          `#${targetClass} > ul > li:nth-child(2)`
        );
        const selectGame = document.querySelector(
          "#RingGrid > div.grid_data > div:nth-child(1) > div:nth-child(1)"
        );
        const game = document.querySelector(
          "#RingGrid > div.grid_data > div:nth-child(1) > div:nth-child(1)"
        );

        const count = document.querySelectorAll(".tablecontent .hide").length;

        if (count && count.length > 0) {
          console.log(`Количество скрытых элементов: ${count}`);
        }

        if (selectGame) {
          ["mousedown", "mouseup", "click"].forEach((eventType) => {
            const event = new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            selectGame.dispatchEvent(event);
          });
        } else {
          console.error(
            `Кнопка с классом ".${selectGame}" в старом дереве не найдена!`
          );
        }

        if (game) {
          ["click"].forEach((eventType) => {
            const event = new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            game.dispatchEvent(event);
          });
        } else {
          console.error(
            `Кнопка с классом ".${game}" в старом дереве не найдена!`
          );
        }

        if (selectTab) {
          ["mousedown", "mouseup", "click"].forEach((eventType) => {
            const event = new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            selectTab.dispatchEvent(event);
          });
        } else {
          console.error(
            `Кнопка с классом ".${selectTab}" в старом дереве не найдена!`
          );
        }

        if (oldButton) {
          console.log(
            `Клик по новой кнопке "${event.target.textContent}", перенаправляем на старую "${oldButton.textContent}"`
          );

          ["mousedown", "mouseup", "click"].forEach((eventType) => {
            const event = new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            oldButton.dispatchEvent(event);
          });
        }
      }
    });

  function clickElementByIndex(index, hiddenElements) {
    if (hiddenElements.length > index) {
      const targetContainer = hiddenElements[index];
      const targetElement = targetContainer.querySelector(".sp_seat"); // Получаем вложенный элемент

      if (!targetElement) {
        console.warn(`Элемент .sp_seat внутри .hide[${index}] не найден.`);
        return;
      }

      console.log(`Кликаем по элементу с индексом ${index}:`, targetElement);

      ["mousedown", "mouseup", "click"].forEach((eventType) => {
        const event = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        targetElement.dispatchEvent(event);
      });
    } else {
      console.warn(`Элемент с индексом ${index} не найден.`);
    }
  }
});
