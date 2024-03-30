import { Fetch } from "./fetch.js";

/**
 * @typedef {import('./types.js').StationFuelInfo} StationFuelInfo
 */
export class FavoriteStationsList extends Fetch {
  /**
   * @type {JQuery<HTMLElement>}
   */
  $containerEl;

  /**
   * @type {JQuery<HTMLElement>}
   */
  $tableBodyEl;

  /**
   * 
   * @type {JQuery<HTMLElement>}
   */
  $templateEl;

  constructor({ endpoint = '/favorite-stations', containerEl, templateEl }) {
    super();
    this.endpoint = endpoint;
    this.$containerEl = containerEl;
    this.$templateEl = templateEl;

    this.init();
  }

  init() {
    this.search();
  }

  async search() {
    this.reset();

    this.items = await this.getItems();
  }

  _items() {
    this.items.forEach(item => {
      this.createRow(item);
    });
  }

  _sort() {
    this.$tableEl.attr('sort', this.sort);
  }

  _order() {
    this.$tableEl.attr('order', this.order);
    this.search();
  }

  /**
   * 
   * @param {StationFuelInfo} item 
   */
  createRow(item) {
    const { $templateEl, $containerEl } = this;

    const $row = $templateEl.clone();

    $row.removeClass('template');

    $row.find('img').attr('src', item.image);
    $row.find('.price').text(item.petrol_price);
    $row.attr('status', item.petrol_status);

    $containerEl.append($row);
  }

  reset() {
    this.$containerEl.find('.station-card:not(.template)').remove();
  }

  /**
   * 
   * @returns {Promise<StationFuelInfo[]>}
   */
  async getItems() {
    return [
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'up',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'down',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'down',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'down',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'down',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
      {
        name: 'BP',
        address: 'Armada Way, London, Inner London, E67FB',
        image: '/images/tesco.svg',
        url: 'https://www.bp.com',
        favorite: true,
        distance: 1,
        petrol_price: 136.9,
        petrol_status: 'down',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
    ]
  }

}
