import { openDB } from 'idb';

const DB_NAME = 'pdf-converter-db';
const STORE_NAME = 'pdf-files';

export const IndexedDBService = {
  async init() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  },

  async savePDF(id: string, text: string, pdfBlob: Blob) {
    const db = await this.init();
    await db.put(STORE_NAME, { id, text, pdfBlob, timestamp: Date.now() });
  },

  async getPDF(id: string): Promise<Blob | null> {
    const db = await this.init();
    const record = await db.get(STORE_NAME, id);

    return record ? record.pdfBlob : null;
  },

  async getAllHistory() {
    const db = await this.init();
    const records = await db.getAll(STORE_NAME);

    return records.sort((a, b) => b.timestamp - a.timestamp);
  },
};
