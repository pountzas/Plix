/**
 * File persistence utilities using IndexedDB
 * Handles storing and retrieving video files across browser sessions
 */

interface StoredFile {
  id: string;
  fileName: string;
  file: File;
  blob: Blob;
  url: string;
  lastModified: number;
  size: number;
}

// IndexedDB setup
class FilePersistenceDB {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'PlixMediaDB';
  private readonly storeName = 'files';
  private readonly version = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('File persistence DB initialized');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('fileName', 'fileName', { unique: false });
          store.createIndex('lastModified', 'lastModified', { unique: false });
        }
      };
    });
  }

  async storeFile(file: File): Promise<string> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      // Create blob URL for immediate use
      const blobUrl = URL.createObjectURL(file);

      const storedFile: StoredFile = {
        id: `${file.name}_${file.lastModified}`,
        fileName: file.name,
        file: file,
        blob: file, // Store the file as blob
        url: blobUrl,
        lastModified: file.lastModified,
        size: file.size,
      };

      const request = store.put(storedFile);

      request.onsuccess = () => {
        console.log(`File stored: ${file.name}`);
        resolve(storedFile.id);
      };

      request.onerror = () => {
        console.error('Failed to store file:', request.error);
        reject(request.error);
      };
    });
  }

  async getFile(id: string): Promise<StoredFile | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        const storedFile = request.result;
        if (storedFile) {
          // Recreate blob URL if it doesn't exist or is revoked
          if (!storedFile.url || storedFile.url.startsWith('blob:')) {
            storedFile.url = URL.createObjectURL(storedFile.blob);
          }
          resolve(storedFile);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        console.error('Failed to get file:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllFiles(): Promise<StoredFile[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const files = request.result as StoredFile[];
        // Ensure all blob URLs are valid
        files.forEach(file => {
          if (!file.url || file.url.startsWith('blob:')) {
            file.url = URL.createObjectURL(file.blob);
          }
        });
        resolve(files);
      };

      request.onerror = () => {
        console.error('Failed to get all files:', request.error);
        reject(request.error);
      };
    });
  }

  async deleteFile(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`File deleted: ${id}`);
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to delete file:', request.error);
        reject(request.error);
      };
    });
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('All files cleared');
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to clear files:', request.error);
        reject(request.error);
      };
    });
  }
}

// Singleton instance
const fileDB = new FilePersistenceDB();

// Public API
export const filePersistence = {
  async init(): Promise<void> {
    await fileDB.init();
  },

  async storeFile(file: File): Promise<string> {
    return fileDB.storeFile(file);
  },

  async getFile(id: string): Promise<StoredFile | null> {
    return fileDB.getFile(id);
  },

  async getAllFiles(): Promise<StoredFile[]> {
    return fileDB.getAllFiles();
  },

  async deleteFile(id: string): Promise<void> {
    return fileDB.deleteFile(id);
  },

  async clearAll(): Promise<void> {
    return fileDB.clearAll();
  },

  // Utility functions
  getFileId(file: File): string {
    return `${file.name}_${file.lastModified}`;
  },

  async fileExists(id: string): Promise<boolean> {
    const file = await fileDB.getFile(id);
    return file !== null;
  },
};

export type { StoredFile };
export default filePersistence;
