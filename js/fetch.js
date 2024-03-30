export class Fetch {
  /**
   * @type {string}
   */
  endpoint = '/stations'

  state = {
    sort: 'id',
    order: 'asc',
    items: [],
    page: 1,
    limit: 10
  }

  abortController = new AbortController();

  _sort() {
    // extend this method to run after sorting is changed
  }

  _order() {
    // extend this method to run after order is changed
  }

  _page() {
    // extend this method to run after page is changed
  }

  _limit() {
    // extend this method to run after limit is changed
  }

  _items() {
    // extend this method to run after items are changed
  }

  set sort(value) {
    this.state.sort = value;
    this._sort();
  }

  set order(value) {
    this.state.order = value;
    this._order();
  }

  set page(value) {
    this.state.page = value;
    this._page();
  }

  set limit(value) {
    this.state.limit = value;
    this._limit();
  }

  set items(value) {
    this.state.items = value;
    this._items();
  }

  get sort() {
    return this.state.sort;
  }

  get order() {
    return this.state.order;
  }

  get page() {
    return this.state.page;
  }

  get limit() {
    return this.state.limit;
  }

  get items() {
    return this.state.items;
  }

  async getItems() {
    this.abortController.abort();

    this.abortController = new AbortController();

    const searchParams = new URLSearchParams({
      sort: this.state.sort,
      order: this.state.order,
      page: this.state.page,
      limit: this.state.limit,
    });

    const url = new URL(`${window.location.origin}${this.endpoint}?${searchParams}`);

    return await (await fetch(url, {
      signal: this.abortController.signal,
    })).json();
  }

}