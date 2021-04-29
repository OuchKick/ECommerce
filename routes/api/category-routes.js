const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryCardData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryCardData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryCardData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryCardData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryCardData);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryCardData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryCardData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
