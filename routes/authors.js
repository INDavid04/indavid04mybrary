const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author() })
})

// Create author route
router.post('/', async (req, res) => {
    const author = new Author ({
        name: req.body.name
    })

    // Using asyinc
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

    /* New code from comments without using asyinc */
    // author.save().then((newAuthor) => {
    //     res.render('authors')
    // }).catch((err) => {
    //     res.render('authors/new', {
    //         author: author,
    //         errorMessage: 'Error creating Author'
    //     })
    // })

    /* Old code which does not work any more */
    // author.save((err, newAuthor) => {
    //     if (err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else {
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
})

module.exports = router