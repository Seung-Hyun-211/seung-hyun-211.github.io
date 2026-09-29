(() => {
  const search = document.querySelector("#post-search");
  const category = document.querySelector("#category-filter");
  const sortOrder = document.querySelector("#sort-order");
  const list = document.querySelector("#post-list");
  const cards = [...document.querySelectorAll(".post-card")];
  const empty = document.querySelector("#empty-state");

  if (!search || !category || !sortOrder || !list) return;
  if (cards.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  if (requestedCategory && [...category.options].some((option) => option.value === requestedCategory)) {
    category.value = requestedCategory;
  }
  if (params.get("sort") === "oldest") sortOrder.value = "oldest";

  const originalPosition = new Map(cards.map((card, index) => [card, index]));
  const sortPosts = () => {
    const direction = sortOrder.value === "oldest" ? 1 : -1;
    const ordered = [...cards].sort((a, b) => {
      const difference = Number(a.dataset.timestamp) - Number(b.dataset.timestamp);
      return direction * difference || originalPosition.get(a) - originalPosition.get(b);
    });
    ordered.forEach((card) => list.insertBefore(card, empty));
  };

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
  sortOrder.addEventListener("change", sortPosts);
  sortPosts();
  filterPosts();
})();
