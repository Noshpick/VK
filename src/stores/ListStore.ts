import { makeAutoObservable } from 'mobx';
import { apiClient } from '../api/apiClient';

export class ListStore {
  items: { id: number; name: string }[] = [];
  page = 1;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems() {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const response = await apiClient.get(`/search/repositories`, {
        params: {
          q: 'javascript',
          sort: 'stars',
          order: 'asc',
          page: this.page,
        },
      });
      this.items = [...this.items, ...response.data.items];
      this.page += 1;
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      this.isLoading = false;
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateItem(id: number, newData: { name: string }) {
    this.items = this.items.map(item => (item.id === id ? { ...item, ...newData } : item));
  }
}
