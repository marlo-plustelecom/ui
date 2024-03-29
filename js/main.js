import { Aside } from './aside.js';
import { trackSize } from './size-tracker.js';

$(() => {
  function debounce(cb, delay) {
    let timeout;

    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    }
  }

  const $asideEl = $('aside');
  const $searchInput = $asideEl.find('input[name="search"]');
  const $searchForm = $asideEl.find('form');
  const $searchBtnIcon = $asideEl.find('.input-group-append')
  const $sortBy = $('.sortBy');
  const $list = $('.list');
  const $toggleViewBtn = $('.btn-toggle button');
  const $toggleSizeBtn = $('.toggle-size');

  const $stationTemplate = $('.station-card.template');
  const $adsTemplate = $('.ads-card.template');

  const asideController = new Aside({
    container: $asideEl,
    searchLabel: $asideEl.find('.search-label'),
    fuelLabel: $asideEl.find('.fuel-label'),
    sortBy: $sortBy,
    stationTemplate: $stationTemplate,
    adsTemplate: $adsTemplate,
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
    $searchInput.val('');
    $searchInput.focus();
  });

  $sortBy.on('click', debounce((event) => {
    const value = event.target.value;

    if (value !== asideController.sortBy) {
      asideController.sortBy = value;
    }
  }, 100));

  $toggleViewBtn.on('click', () => {
    if (asideController.view === Aside.VIEW.LIST) {
      return asideController.view = Aside.VIEW.MAP;
    }

    asideController.view = Aside.VIEW.LIST;
  });

  $toggleSizeBtn.on('click', () => {
    asideController.collapse = !asideController.collapse;
  });

  /** TESTING */
  if (location.origin.includes('localhost') || location.origin.includes('127.0.0.1')) {
    asideController.search('test', 'diesel')

    trackSize('aside');
  }
})