const Project = require('../db/models/project')

 const setupChangeStream = (collection) => {
    const changeStream = collection.watch();
  try{
    changeStream.on('change', (change) => {
        // Tutaj możesz reagować na zmiany w kolekcji, np. wysyłać powiadomienia, aktualizować interfejs użytkownika itp.
        console.log("Collection update:", change);
      });
    
      changeStream.on('error', (error) => {
        console.error('Change stream error:', error);
      });
    }
    catch(error){
        console.log(error)
    }
    
  }

  // Wywołanie funkcji do obsługi zmian w kolekcji
  module.exports = {
    setupChangeStream,
  };