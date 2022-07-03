const fs = require('../helprs/fs');


const get = async (req, res, next) => {
   
      const data = await fs.read();
      if(data.length === 0) {
        return next({status: 404, message: '<-- Dados inexistentes -->'});
      }
      return res.status(200).json(data);
      next()
  
}

const getById = async (req, res, next) => {  
  try {    
    const { id } = req.params;
    const data = await fs.read();
    const idExists = data.find((r) => r.id === Number(id));    
    if (!idExists) {
      return next({status: 404, message: '<-- ID não encontrado -->'});
    }
    return res.status(200).json(idExists);    
  } catch (error) {
    next(error);
    
  }
  
  next()
}
const getSearchByName_maxPrice = async (req, res, next) => {
  try {
    const { name, maxPrice } = req.query;
    if(!name || !maxPrice) {
      return next({status: 400, message: '<-- Nome ou preço máximo não informado -->'});
    }
    const data = await fs.read();
    const recipes = data.filter(u=> u.name
      .toLowerCase()
      .includes(name
        .toLowerCase()) && u.price < maxPrice);   
    if (recipes.length === 0) {
      return next({status: 404, message: '<-- Nome e preços incompatíveis -->'});
    };
    return res.status(200).json(recipes);
  } catch (error) {
    next(error);
    
  }   
}

const post = async (req, res, next) => {  
  try {
    const { id, name, price, waitTime } = req.body;
    const data = await fs.read();
    data.push({ 
      id: data.length,
      name, 
      price, 
      waitTime});
    await fs.write(data);
    return res.status(201).json({ 
      id: data.length,
      name,
      price,
      waitTime
    }); 
    
  } catch (error) {
    next(error);  
  }  
};

const putById = async  (req, res, next) =>{
    try {
      const { id } = req.params;
        const { name, price, waitTime } = req.body;
        const data = await fs.read();
        const recipeIndex = data.findIndex((r) => r.id === Number(id));
        if (recipeIndex === -1) return next({status: 404, message: '<-- Id não rncontrado -->'});
        data[recipeIndex] = { 
          id: Number(id),
          name, 
          price, 
          waitTime};
        await fs.write(data);
        return res.status(200).json(data[recipeIndex]);
      
    } catch (error) {
      next(error);
    }  
}

    
   

;

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fs.read();
    const recipeIndex = data.findIndex((r) => r.id === Number(id));
    if (recipeIndex === -1) return next({status: 404, message: '<-- Id não rncontrado -->'});
    data.splice(recipeIndex, 1);
    await fs.write(data);
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
}
const notFound = (req, res, next) => {
  try {
    return next({status: 404, message: '<-- Id não rncontrado -->'});
  } catch (error) {
    next(error);

  }
   
}
module.exports = {
    get,
    getById,
    getSearchByName_maxPrice,
    post,
    putById,
    deleteById,
    notFound,
};