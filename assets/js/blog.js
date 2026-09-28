(() => {
  const search = document.querySelector("#post-search");
  const category = document.querySelector("#category-filter");
  const cards = [...document.querySelectorAll(".post-card")];
  const empty = document.querySelector("#empty-state");

  if (!search || !category || cards.length === 0) return;

  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  if (requestedCategory && [...category.options].some((option) => option.value === requestedCategory)) {
    category.value = requestedCategory;
  }

  const filterPosts = () => {
    const query = search.value.trim().toLocaleLowerCase("ko");
    const selectedCategory = category.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesText = !query || card.dataset.search.toLocaleLowerCase("ko").includes(query);
      const matchesCategory = !selectedCategory || card.dataset.categories.includes(`|${selectedCategory}|`);
      const visible = matchesText && matchesCategory;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (empty) empty.hidden = visibleCount !== 0;
  };

  search.addEventListener("input", filterPosts);
  category.addEventListener("change", filterPosts);
  filterPosts();
})();
