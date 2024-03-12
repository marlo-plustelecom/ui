$(() => {

  function debounce(cb, delay) {
    let timeout;

    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    }
  }

  class Aside {
    static MODES = {
      SEARCH: 'search',
      RESULT: 'result',
    }

    static FUEL = {
      PETROL: 'petrol',
      DIESEL: 'diesel',
    }

    static SORT_BY = {
      PRICE: 'price',
      DISTANCE: 'distance',
    }


    state = {
      mode: Aside.MODES.RESULT,
      fuel: Aside.FUEL.PETROL,
      search: '',
      sort: Aside.SORT_BY.PRICE,
    }

    /**
     * @type {JQuery<HTMLElement> | null}
     */
    asideEl = null;
    /**
     * @type {JQuery<HTMLElement> | null}
     */

    searchLabelEl = null;
    /**
     * @type {JQuery<HTMLElement> | null}
     */
    fuelLabelEl = null;
    /**
     * @type {JQuery<HTMLElement> | null}
     */
    sortByEl = null;

    constructor({
      container,
      searchLabel,
      fuelLabel,
      sortBy,
    }) {
      this.asideEl = container;
      this.searchLabelEl = searchLabel;
      this.fuelLabelEl = fuelLabel;
      this.sortByEl = sortBy;

      this.mode = this.state.mode;
    }

    get mode() {
      return this.state.mode;
    }

    set mode(value) {
      this.state.mode = value;
      this.asideEl.attr('mode', value);
    }

    get sortBy() {
      return this.state.sort;
    }

    set sortBy(value) {
      this.state.sort = value;
      this.sortByEl.attr('value', value);
    }

    search(search, fuel) {
      this.state.search = search;
      this.state.fuel = fuel;

      this.mode = Aside.MODES.RESULT;

      this.searchLabelEl.text(search);
      this.fuelLabelEl.text(fuel);
    }
  }

  const $asideEl = $('aside');
  const $searchForm = $asideEl.find('form');
  const $searchBtnIcon = $asideEl.find('.input-group-append')
  const $sortBy = $('.sortBy');

  const asideController = new Aside({
    container: $asideEl,
    searchLabel: $asideEl.find('.search-label'),
    fuelLabel: $asideEl.find('.fuel-label'),
    sortBy: $sortBy,
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