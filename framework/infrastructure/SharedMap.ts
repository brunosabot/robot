const mapDatabase = new Map<string, Map<string, any>>();

export default function mapFactory<T>(name: string): Map<string, T> {
  if (mapDatabase.has(name)) {
    return mapDatabase.get(name) as Map<string, T>;
  }

  const map = new Map<string, T>();
  mapDatabase.set(name, map);
  return map;
}
