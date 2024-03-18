
/**
 * @typedef {{ name: string, image: string, distance: number, price: number, fuel: string, status: 'up' | 'down' }} Station
 *  
 */

export class Aside {
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

  static VIEW = {
    MAP: 'map',
    LIST: 'list'
  }

  state = {
    mode: Aside.MODES.SEARCH,
    fuel: Aside.FUEL.PETROL,
    search: '',
    sort: Aside.SORT_BY.PRICE,
    view: Aside.VIEW.LIST,

    collapse: false,

    /**
     * @type {Station[]}
     */
    items: [],
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

  /**
   * @type {JQuery<HTMLElement> | null}
   */
  stationTemplateEl = null;

  /**
   * @type {JQuery<HTMLElement> | null}
   */
  listEl = null;

  constructor({
    container,
    searchLabel,
    fuelLabel,
    sortBy,
    stationTemplate,
    adsTemplate,
    list
  }) {
    this.asideEl = container;
    this.searchLabelEl = searchLabel;
    this.fuelLabelEl = fuelLabel;
    this.sortByEl = sortBy;
    this.stationTemplateEl = stationTemplate;
    this.adsTemplateEl = adsTemplate;
    this.listEl = list;
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

    this.generateList();
  }

  get view() {
    return this.state.view;
  }

  set view(value) {
    this.state.view = value;
    this.asideEl.attr('view', value);
  }

  get collapse() {
    return this.state.collapse;
  }

  set collapse(value) {
    this.state.collapse = value;
    this.asideEl.attr('collapse', value);
  }

  async search(search, fuel) {
    this.state.search = search;
    this.state.fuel = fuel;

    this.mode = Aside.MODES.RESULT;
    this.view = Aside.VIEW.LIST;

    this.searchLabelEl.text(search);
    this.fuelLabelEl.text(fuel);

    const items = await this.getItems(search, fuel);
    this.items = items;

    this.generateList();
  }

  generateList() {
    const items = this.sortItem(this.items);

    this.listEl.html('');

    this.listEl.attr('two', items.length % 2);
    this.listEl.attr('three', items.length % 3);

    this.generateAds();

    items.forEach((item, index) => {
      const template = this.stationTemplateEl.clone(true);

      template.removeClass('template');

      template.attr('status', item.status);
      template.find('.image').attr('src', item.src).attr('alt', item.name);
      template.find('.price').text(item.price);

      template.get(0).style.order = index;

      this.listEl.append(template);
    });

    this.generateFiller();
  }

  generateFiller() {
    const startingIndex = this.items.length;
    for (let i = 0; i < 2; i++) {
      const template = this.stationTemplateEl.clone(true);

      template.removeClass('template').addClass('filler');

      template.find('.price').text(0);
      template.get(0).style.order = startingIndex + i;

      this.listEl.append(template);
    }
  }

  generateAds() {
    const adsLength = Math.max(1, Math.floor(this.items.length / 4));

    for (let i = 0; i < adsLength; i++) {
      const template = this.adsTemplateEl.clone(true);
      template.removeClass('template');

      this.listEl.append(template);
    }
  }

  /**
   * 
   * @param {Station[]} items 
   * @returns {Station[]}
   */
  sortItem(items) {
    return items.slice(0).sort((a, b) => {
      if (this.sortBy === Aside.SORT_BY.PRICE) {
        return a.price - b.price;
      }

      return a.distance - b.distance;
    })
  }

  async getItems() {
    return [
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 136.9,
        distance: 100,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 121.0,
        distance: 120,
        status: 'down',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 122.2,
        distance: 110,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 111.3,
        distance: 90,
        status: 'down',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      }, {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 111.3,
        distance: 90,
        status: 'down',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      }, {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 111.3,
        distance: 90,
        status: 'down',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      },
      {
        name: 'Tesco',
        src: './images/tesco.svg',
        price: 118.5,
        distance: 40,
        status: 'up',
      }
    ]
  }
}
