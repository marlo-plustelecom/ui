import { Fetch } from "./fetch.js";

/**
 * @typedef {import('./types.js').StationFuelInfo} StationFuelInfo
 */
export class StationsList extends Fetch {
  /**
   * @type {JQuery<HTMLElement>}
   */
  $tableEl;

  /**
   * @type {JQuery<HTMLElement>}
   */
  $tableBodyEl;

  /**
   * 
   * @type {JQuery<HTMLElement>}
   */
  $templateEl;

  constructor({ endpoint = '/stations', tableEl, templateEl }) {
    super();
    this.endpoint = endpoint;
    this.$tableEl = tableEl;
    this.$tableBodyEl = tableEl.find('tbody');
    this.$templateEl = templateEl;

    this.init();
  }

  init() {
    const { $tableEl } = this;

    $tableEl.attr('sort', this.state.sort);
    $tableEl.attr('order', this.state.order);

    $tableEl.on('click', 'th', event => {
      event.preventDefault();

      const $th = $(event.currentTarget);

      const newSort = $th.attr('class');

      const oldOrder = this.order;
      const oldSort = this.sort;

      if (oldSort !== newSort) {
        this.sort = newSort;
        this.order = 'asc';
        return;
      }

      this.order = oldOrder === 'asc' ? 'desc' : 'asc';
    });


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
    const { $templateEl, $tableBodyEl } = this;

    const $row = $templateEl.clone();

    $row.removeClass('template');

    $row.find('.name').text(item.name);
    $row.find('img').attr('src', item.image);
    $row.find('.address').text(item.address);
    $row.find('.distance').text(item.distance);
    $row.find('.petrol-price span').text(item.petrol_price);
    $row.find('.petrol-price').attr('status', item.petrol_status);
    $row.find('.diesel-price span').text(item.diesel_price);
    $row.find('.diesel-price').attr('status', item.diesel_status);

    $tableBodyEl.append($row);
  }

  reset() {
    this.$tableBodyEl.find('tr:not(.template)').remove();
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
        petrol_status: 'up',
        diesel_price: 143.9,
        diesel_status: 'down',
      },
    ]
  }

}
