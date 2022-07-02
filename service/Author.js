const fs = require('../helprs/fs');


const get = async (req, res) => {
   
      const data = await fs.read();
      if(data.length === 0) {
        return res.status(404).json({ message: 'Recipes not found!' });
      }
      res.status(200).json(data);
  
}

const getById = async (req, res) => {
    const { id } = req.params;
    const data = await fs.read();
    const recipe = data.find((r) => r.id === Number(id));
    if (!recipe) return res.status(404).json({ message: 'Recipe not found!'});
    return res.status(200).json(recipe);
}
const getSearchByName_maxPrice = async (req, res) => {
    const { name, maxPrice } = req.query;
    const data = await fs.read();
    const recipes = data.filter(u=> u.name
      .toLowerCase()
      .includes(name
        .toLowerCase()) && u.price < maxPrice);   
    if (recipes.length === 0) {
      return res
      .status(404)
      .json({ message: 'Recipes not found!'})
    };
    return res.status(200).json(recipes);
    
}


const post = async (req, res) => {
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
};

const putById = async  (req, res) =>{
    const { id } = req.params;
    const { name, price, waitTime } = req.body;
    const data = await fs.read();
    const recipeIndex = data.findIndex((r) => r.id === Number(id));
    if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });
    data[recipeIndex] = { 
      id: Number(id),
      name, 
      price, 
      waitTime};
    await fs.write(data);
    return res.status(200).json(data[recipeIndex]);

};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const data = await fs.read();
    const recipeIndex = data.findIndex((r) => r.id === Number(id));
    if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });
    data.splice(recipeIndex, 1);
    await fs.write(data);
    return res.status(204).end();
}
const notFound = (req, res) => {
    return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
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