const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    return res.json(items);
});

router.post('/', (req, res) => {
    items.push(req.body);

    return res.json({
        added: req.body,
    });
});

router.get('/:name', (req, res) => {
    const item = items.find((i) => i.name === req.params.name);

    return res.json(item);
});

router.patch('/:name', (req, res) => {
    const item = items.find((i) => i.name === req.params.name);

    item.name = req.body.name;
    item.price = req.body.price;

    return res.json({
        updated: item,
    });
});

router.delete('/:name', (req, res) => {
    items = items.filter((item) => item.name !== req.params.name);

    return res.json({
        message: 'Deleted',
    });
});

module.exports = router;
