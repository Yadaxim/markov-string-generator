# markov-string-generator

a simple random string generator based en second order markov chains.

#Install

npm install --save markov-string-generator

#Usage

Generator = require('markov-string-generator')

chains = [ 'gataca', 'gtgtagta', 'gtcgctgcta' ]

generator = new Generator(chains)

console.log(generator.randomChain())
