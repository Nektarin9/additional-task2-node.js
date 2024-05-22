document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const { btnUpdate, btnDelete, input, id } = initialBtn(false);
    if (event.target.textContent !== "Отменить") {
      remove(id).then(() => {
        event.target.closest("li").remove();
      });
    } else {
      changeStylesBtn(btnUpdate, btnDelete, input, false);
    }
  }
  else if (event.target.dataset.type === "update") {
    const { btnUpdate, btnDelete, input, id } = initialBtn(true);

    if (btnUpdate.textContent !== "Сохранить") {
      changeStylesBtn(btnUpdate, btnDelete, input, true);
    } else {
      changeStylesBtn(btnUpdate, btnDelete, input, false);
      update(id, input.value);
    }
  }
});

function initialBtn(type) {
  let btnUpdate;
  let btnDelete;
  if (type) {
    btnUpdate = event.target;
    btnDelete = btnUpdate.nextElementSibling;
  } else {
    btnDelete = event.target;
    btnUpdate = btnDelete.previousElementSibling;
  }
  return {
    btnUpdate,
    btnDelete,
    input: btnUpdate.parentNode.previousElementSibling,
    id: event.target.dataset.id,
  };
}

function changeStylesBtn(btnUpdate, btnDelete, input, type) {
  if (type) {
    btnUpdate.textContent = "Сохранить";
    btnUpdate.classList.replace("btn-primary", "btn-success");
    btnDelete.textContent = "Отменить";
    input.style.border = "1px solid black";
    input.disabled = false;
  } else {
    btnUpdate.classList.replace("btn-success", "btn-primary");
    btnUpdate.textContent = "Обновить";
    btnDelete.innerHTML = "&times;";
    input.style.border = "none";
    input.disabled = true;
  }
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function update(id, newNotea) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: newNotea,
      id,
    }),
  });
}
