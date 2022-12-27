const fs = require("fs");

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async deleteById(id) {
      try {
        id = Number(id);
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const objectIdToBeRemoved = parsedData.find(
          (producto) => producto.id === id
        );
  
        if (objectIdToBeRemoved) {
          const index = parsedData.indexOf(objectIdToBeRemoved);
          parsedData.splice(index, 1);
          await fs.promises.writeFile(this.nombre, JSON.stringify(parsedData));
          return true;
        } else {
          console.log(`ID ${id} does not exist in the file`);
          return null;
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
        );
      }
    }

    async save(object) {
      try {
        const allData = await this.getData();
        const parsedData = JSON.parse(allData);
  
        object.id = parsedData.length + 1;
        parsedData.push(object);
  
        await fs.promises.writeFile(this.nombre, JSON.stringify(parsedData));
        return object.id;
      } catch (error) {
        console.log(
          `Error Code: ${error.code} | There was an error when trying to save an element`
        );
      }
    }
    async getAll() {
        let Object = []
        try {
            Object = await this.getData()
            console.log(JSON.parse(Object));
            return JSON.parse(Object);
        } catch (error) {
            console.log(Object);
            throw error
        }
    }
    async obtenerID(id){
        try{
            const data = await this.getData();
            const arrayProductos = JSON.parse(data);
            return arrayProductos.find((producto) => producto.id === id);

        }catch (error){
            throw error
        }
    }
    
    async updateByID(id, newData) {
      try {
        id = Number(id);
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const objectIdToBeUpdated = parsedData.find(
          (producto) => producto.id === id
        );
        if (objectIdToBeUpdated) {
          const index = parsedData.indexOf(objectIdToBeUpdated);
          const {title, price, thumbnail} = newData;
  
          parsedData[index]['title'] = title;
          parsedData[index]['price'] = price;
          parsedData[index]['thumbnail'] = thumbnail;
          await fs.promises.writeFile(this.nombre, JSON.stringify(parsedData));
          return true;
        } else {
          console.log(`ID ${id} does not exist in the file`);
          return null;
        }
  
      } catch (error) {
        `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
      }
    }
        
    async getData() {
        const data = await fs.promises.readFile(this.nombre, "utf-8");
        return data;
    }

}

module.exports = Contenedor;
