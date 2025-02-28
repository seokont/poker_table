// Ожидаем загрузки всего DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM полностью загружен и разобран");

  // 🔹 Функция для отслеживания изменений в DOM
  function observeChanges(targetNode) {
    if (!targetNode) {
      console.warn("❌ Ошибка: Указанный узел для отслеживания не найден.");
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const target = mutation.target;
        const computedStyle = getComputedStyle(target);

        // 🔹 1. Отслеживание `display: block` через inline-стиль
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          console.log("⏳ Изменение стиля:", target);

          if (computedStyle.display === "block") {
            console.log("✅ .dialog стал видимым (display: block) →", target);
            handleDialogAppearance(target);
          } else if (computedStyle.display === "none") {
            console.log("❌ .dialog скрыт (display: none) →", target);
          }
        }

        // 🔹 2. Отслеживание `display: block` через изменение классов
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setTimeout(() => {
            if (computedStyle.display === "block") {
              console.log(
                "🎯 .dialog стал видимым через изменение classList →",
                target
              );
              handleDialogAppearance(target);
            }
          }, 50);
        }

        // 🔹 3. Добавляем наблюдение за новыми `.dialog`
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains("dialog")) {
              console.log("➕ Новый .dialog добавлен в DOM:", node);

              observer.observe(node, {
                attributes: true,
                attributeFilter: ["style", "class"],
              });
              handleDialogAppearance(target);
            }
          });
        }
      });
    });

    // 🔥 Подключаем `MutationObserver` ко всему `body`
    observer.observe(document.body, { childList: true, subtree: true });

    // 🔥 Следим за уже существующими `.dialog`
    document.querySelectorAll(".dialog").forEach((element) => {
      observer.observe(element, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    });

    console.log("🔍 Запуск наблюдения за `.dialog`...");
  }

  // 🔥 Функция обработки появления `.dialog`
  function handleDialogAppearance(dialogElement) {
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    const tableName = getQueryParam("TableName");
    if (!tableName) {
      console.warn("❌ Ошибка: TableName не найден в URL.");
      return;
    }

    const decodedTableName = decodeURIComponent(`R${tableName.trim()}`);
    console.log("decodedTableName:", decodedTableName);

    // Ищем элемент с `id`
    const tableElement_f =
      document.getElementById(decodedTableName) ||
      document.querySelector(`[id='${CSS.escape(decodedTableName)}']`);

    if (tableElement_f) {
      const yello = tableElement_f.children;
      if (!yello[2]) return;

      const hiddenElements = [...yello[2].querySelectorAll("div.hide")].filter(
        (el) => el.classList.length === 1
      );

      let newTree = document.getElementById("new_button");
      if (!newTree) {
        console.warn("❌ Ошибка: `#new_button` не найден в DOM ghhgjhjhj.");
        return;
      }

      hiddenElements.forEach((el, index) => {
        if (!newTree.querySelector(`[data-index='${index}']`)) {
          const button = document.createElement("button");
          button.textContent = `Нажать ${index + 1}`;
          button.style.display = "block";
          button.style.margin = "5px";
          button.dataset.index = index;
          button.dataset.target = el.getAttribute("class") || `hide-${index}`;
          button.addEventListener("click", () =>
            clickElementByIndex(index, hiddenElements)
          );
          newTree.appendChild(button);
        }
      });
    } else {
      console.warn("❌ Ошибка: Элемент с таким ID не найден.");
    }
  }

  // 🔹 Выбираем, за чем следить
  const targetElement = document.body;
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

        function triggerClick(element) {
          if (element) {
            ["mousedown", "mouseup", "click"].forEach((eventType) => {
              const event = new MouseEvent(eventType, {
                bubbles: true,
                cancelable: true,
                view: window,
              });
              element.dispatchEvent(event);
            });
          } else {
            console.error(`Элемент не найден!`);
          }
        }

        triggerClick(selectGame);
        triggerClick(game);
        triggerClick(selectTab);
        triggerClick(oldButton);
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
