import { StoryProject } from '../types/story';

const DB_NAME = 'AdventureStoryBuilder';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

class StoryStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'story.id' });
          store.createIndex('title', 'story.title', { unique: false });
          store.createIndex('updatedAt', 'story.updatedAt', { unique: false });
        }
      };
    });
  }

  async saveStory(project: StoryProject): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    console.log('Saving story:', project.story.id, project.story.title);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(project);
      
      request.onerror = () => {
        console.error('Failed to save story:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        console.log('Story saved successfully:', project.story.id);
        resolve();
      };
    });
  }

  async loadStory(id: string): Promise<StoryProject | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllStories(): Promise<StoryProject[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onerror = () => {
        console.error('Failed to load stories:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        console.log('Loaded stories:', request.result?.length || 0);
        resolve(request.result || []);
      };
    });
  }

  async deleteStory(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  exportStory(project: StoryProject): string {
    return JSON.stringify(project, null, 2);
  }

  importStory(jsonData: string): StoryProject {
    return JSON.parse(jsonData);
  }
}

export const storyStorage = new StoryStorage();