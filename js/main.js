import { Aside } from './aside.js';

$(() => {

  function debounce(cb, delay) {
    let timeout;

    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    }
  }

  const $asideEl = $('aside');
  const $searchForm = $asideEl.find('form');
  const $searchBtnIcon = $asideEl.find('.input-group-append')
  const $sortBy = $('.sortBy');
  const $list = $('.list');

  const $template = $('.station-card.template');

  const asideController = new Aside({
    container: $asideEl,
    searchLabel: $asideEl.find('.search-label'),
    fuelLabel: $asideEl.find('.fuel-label'),
    sortBy: $sortBy,
    template: $template,
    list: $list,
  });

  $searchForm.on('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const searchValue = formData.get('search').trim();
    const fuelValue = formData.get('fuel');

    if (searchValue.length === 0) {
      return;
    }

    asideController.search(searchValue, fuelValue);
  })

  $searchBtnIcon.on('click', (event) => {
    if (asideController.mode === Aside.MODES.SEARCH) {
      $searchForm.submit();
      return;
    }

    asideController.mode = Aside.MODES.SEARCH;
  });

  $sortBy.on('click', debounce((event) => {
    const value = event.target.value;

    if (value !== asideController.sortBy) {
      asideController.sortBy = value;
    }
  }, 100));
})