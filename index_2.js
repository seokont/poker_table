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
          // 🎯 Фильтруем только добавление новых элементов
          function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
          }

          const tableName = getQueryParam("TableName");
          const decodedTableName = decodeURIComponent(`R${tableName}`);
          console.log("decodedTableName", decodedTableName);
          const tableElement_f = document.getElementById(decodedTableName);
          console.log("tableElement_f", tableElement_f);

          if (tableElement_f) {
            const yello = tableElement_f.children;
            console.log("Элемент найден:", yello[2]);
            const hiddenElements = [
              ...yello[2].querySelectorAll("div.hide"),
            ].filter((el) => el.classList.length === 1);

            // Создаем новое DOM-дерево с кнопками
            if (!newTree) {
              newTree = document.createElement("div");
              newTree.id = "new_tree";
              newTree.style.position = "absolute";
              newTree.style.top = "10px";
              newTree.style.left = "10px";
              newTree.style.padding = "10px";
              newTree.style.background = "rgba(255, 255, 255, 0.8)";
              newTree.style.zIndex = "1000";
              document.body.appendChild(newTree);
            } else {
              newTree.innerHTML = ""; // Очищаем перед добавлением новых кнопок
            }
            hiddenElements.forEach((_, index) => {
              const button = document.createElement("button");
              button.textContent = `Нажать ${index + 1}`;
              button.style.display = "block";
              button.style.margin = "5px";
              button.dataset.index = index;
              button.addEventListener("click", () =>
                clickElementByIndex(index)
              );
              newTree.appendChild(button);
            });
            // hiddenElements.forEach((_, index) => {
            //   const button = document.createElement("button");
            //   button.textContent = `Нажать ${index + 1}`;
            //   button.style.display = "block";
            //   button.style.margin = "5px";
            //   button.dataset.index = index;
            //   button.addEventListener("click", () =>
            //     clickElementByIndex(index)
            //   );
            //   newTree.appendChild(button);
            // });

            // document.body.appendChild(newTree);

            console.log("Только div.hide элементы:", hiddenElements);
          } else {
            console.warn("Элемент с таким ID не найден.");
          }
        }
      });
    });

    observer.observe(targetNode, { childList: true, subtree: true });
    console.log(`Наблюдение запущено за элементом:`, targetNode);
  }

  // 🔹 Выбираем, за чем следить
  const targetElement = document.body; // Или document.getElementById("мой_элемент")
  observeChanges(targetElement);
});
