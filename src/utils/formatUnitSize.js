export function formatUnitSize(fileSize) {
    if (fileSize < 1) {
      // Jeśli rozmiar pliku jest mniejszy niż 1 MB, użyj jednostek KB
      return `${(fileSize * 1024).toFixed(0)} KB`;
    } else {
      // W przeciwnym razie użyj jednostki MB
      return `${fileSize.toFixed(2)} MB`;
    }
  }